import { auth, db } from '../firebase'
import { ref, set, get, push, update, remove, orderByChild, query, equalTo } from 'firebase/database'

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

export const submitLogin = async (user, navigate, showNotification) => {
  const { email, password } = user
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      sessionStorage.setItem('userID', user.uid)
      localStorage.setItem('user', JSON.stringify(user))
      document.dispatchEvent(new CustomEvent("auth", {  detail: { loggedIn: true } }))
      if (user) navigate('/profile')
    })
    .catch(({ message }) => {
      showNotification(message.split(":")[1], 'error')
    })
}

export const submitRegister = async ({ username, email, password }, navigate, showNotification) => {
  const userData = {
    username,
    email
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      set(ref(db, `users/${user.uid}`), userData)
      submitLogin({ email, password}, navigate, showNotification)
    })
    .catch(err => {
      showNotification(err.message.split(':')[1])
    })
}

export const updateEmail = ({ userID, currentEmail, email, emailConfirm, password, showNotification}) =>  {
  if(email === currentEmail) return showNotification("The email has to be different from the current one.", "error")
  if(email === emailConfirm) {
    auth.signInWithEmailAndPassword(currentEmail, password)
      .then(({ user }) => {
        if(user) auth.currentUser.updateEmail(email)
          .then(() => {
            updateData(`users/${userID}`, { email })
            showNotification("Email successfully updated.", "success")
          })
          .catch((error) => showNotification(error.message.split(':')[1].split(".")[0], "error"))
      })
      .catch((error) => showNotification(error.message.split(':')[1].split(".")[0], "error"))
  } else showNotification("Emails dont match.", "error")

}

export const updateData = async (path, data) => {
  const reference = ref(db, path)
  return update(reference, data)
}

export const setData = async (path, data) => {
  const reference = ref(db, path)
  return set(reference, data)
}

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const deleteData = path => {
  const reference = ref(db, path)
  return remove(reference)
}

export const getUserByID = async (userID) => {
    const userRef = ref(db, `users/${userID}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      // console.log('User not found')
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

export const getCommentsByGameID = async gameID => {
  const commentsRef = ref(db, 'commentaires')
  const commentsQuery = query(commentsRef, orderByChild('gameID'), equalTo(gameID))
  const snapshot = await get(commentsQuery)
  if (snapshot.exists()) {
    const commentsObject = snapshot.val()
    const commentsArray = Object.keys(commentsObject).map(key => commentsObject[key])
    return commentsArray
  } else {
    return []
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

  return true;
}

export const getUserVote = async (game, userID) => {
  if (userID === null) {
    return null;
  }

  const votesRef = ref(db, 'votes');
  const userVotesQuery = query(votesRef, orderByChild('userID'), equalTo(userID));

  const snapshot = await get(userVotesQuery);
  if (snapshot.exists()) {
    const votes = snapshot.val();
    for (let key in votes) {
      if (votes[key].gameID === game.key) {
        return votes[key];
      }
    }
  } else {
    return null;
  }
}

export const submitCreateDeal = async (deal, navigate, showNotification) => {
  try {
    const { titre, prixInit, prix, promoCode, description, resizedBase64 } = deal;
    deal.auteur = sessionStorage.getItem('userID');
    deal.dateCreation = new Date().toISOString();
    deal.score = 0;
    deal.nombreCommentaires = 0;
    const tagsObject = {};
    for (let i = 0; i < deal.tags.length; i++) {
        tagsObject[i] = deal.tags[i];
    }

    deal.tags = tagsObject;
    pushData('games', deal);
    navigate('/')
  } catch (error) {
      showNotification(error.message.split(':')[1])
  }
}