import { auth, db } from '../firebase'
import { ref, set, get, push, update, remove } from 'firebase/database'

export const createUser = (path, data) => {
  const reference = ref(db, path)
  return set(reference, data)
}

export const readData = async path => {
  return get(ref(db, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return 0
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export const handleLogOut = () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = '/'
    })
    .catch(err => {
      console.log(err)
    })
}

export const submitLogin = async (user, navigate, setMessage) => {
  const { email, password } = user
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      if (user) {
        navigate('/profile')
      }
    })
    .catch(err => {
      setMessage(err.message.split(':')[1])
    })
}

export const updateData = async (path, data) => {
  const reference = ref(db, path)
  return update(reference, data)
}

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const deleteData = path => {
  const reference = ref(db, path)
  return remove(reference)
}

export const getUserByID = async userID => {
    const userRef = ref(db, `users/${userID}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log('User not found')
      return null
    }
}

export const getTagByID = async tagID => {
  const tagRef = ref(db, `tags/${tagID}`)
  const snapshot = await get(tagRef)
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    console.log('Tag not found')
    return null
  }
}