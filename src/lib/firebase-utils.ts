import { doc, getDoc, setDoc, deleteDoc, collection, query, orderBy, onSnapshot, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage, auth } from "./firebase"
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth"

export async function uploadScreenshot(file: File, orderId: string): Promise<string> {
  const storageRef = ref(storage, `payment-screenshots/${orderId}-${Date.now()}`)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const storageRef = ref(storage, `products/${productId}-${Date.now()}`)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

export async function saveOrder(orderData: Record<string, unknown>) {
  const orderRef = doc(db, "orders", orderData.id as string)
  await setDoc(orderRef, orderData)
}

export async function loginAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logoutAdmin() {
  return signOut(auth)
}

export async function getOrder(orderId: string) {
  const orderRef = doc(db, "orders", orderId)
  const snapshot = await getDoc(orderRef)
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() }
  }
  return null
}

export async function updateOrderStatus(orderId: string, status: "Pending" | "Confirmed" | "Rejected") {
  const orderRef = doc(db, "orders", orderId)
  await setDoc(orderRef, { orderStatus: status }, { merge: true })
}

export async function getAdminUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export async function saveProduct(productId: string, productData: Record<string, unknown>) {
  const productRef = doc(db, "products", productId)
  await setDoc(productRef, productData)
}

export async function updateProduct(productId: string, data: Record<string, unknown>) {
  const productRef = doc(db, "products", productId)
  await updateDoc(productRef, data)
}

export async function deleteProduct(productId: string) {
  const productRef = doc(db, "products", productId)
  await deleteDoc(productRef)
}

export function subscribeToProducts(callback: (products: unknown[]) => void) {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(products)
  })
  return unsubscribe
}
