import { auth, db } from '../firebase'
import { ref, set, get, push, update, remove } from 'firebase/database'

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

export const handleLogOut = (navigate) => {
  auth
    .signOut()
    .then(() => {
      sessionStorage.clear()
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
    })
}

export const submitLogin = async (user, navigate, setMessage) => {
  const { email, password } = user
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      sessionStorage.setItem('userID', user.uid)
      document.dispatchEvent(new CustomEvent("auth", {  detail: { loggedIn: true } }))
      if (user) navigate('/profile')
    })
    .catch(({ message }) => {
      setMessage(message.split(":")[1])
    })
}

export const submitRegister = async ({ email, password }, navigate, setMessage) => {
  const userData = {
    email
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      set(ref(db, `users/${user.uid}`), userData)
      submitLogin({ email, password}, navigate, setMessage)
      navigate('/profile')
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

export const createVote = async (game, userID, voteType) => {
  const vote = {
    gameID: game.key,
    userID: userID,
    voteType: voteType
  }

  const score = voteType ? game.score + 1 : game.score - 1
  pushData('votes', vote);
  updateData(`games/${game.key}`, {score: score});

  return;//TODO return status de creation
}