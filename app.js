
////////////admin authentication//////////////

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"

import { getDatabase, set, ref,onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

// Initialize Firebase
const auth = getAuth()

const dataBase = getDatabase()


const signUp = () => {

    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("signUp-email").value
    let password = document.getElementById("signUp-password").value
    let repeatPassword = document.getElementById("signUp-repeat-password").value

    createUserWithEmailAndPassword(auth, email, password)

    .then((resol) => {

        alert("signup successfully")

        let userId = auth.currentUser.uid

        console.log(userId);

        let usersReference = ref(dataBase, "admin/" + "(" + firstName + ")" + userId)

        let usersObj = {
            firstName: firstName,
            lastName : lastName ,
            email: email,
            password: password,
            repeatPassword : repeatPassword
        }

        set(usersReference, usersObj)

            .then((resol) => {
                alert("Your information have saved")

                window.location.href = "./adminLogin.html"
            })

            .catch((reject) => {

                alert("rejected")
            })

                  })

        

        .catch((rej) => {

            alert("signup failed!", rej)

        })
        }


        

const login = () => {

    let loginEmail = document.getElementById("login-email")

    let loginPassword = document.getElementById("login-password")

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)

        .then((resol) => {

            alert("Successfully login")

            let userId = auth.currentUser.uid

            // console.log(userId);



            // let usernameRef = ref(dataBase, "users/" + userId)
            let userReference = ref(dataBase, "users/", userId)

            onValue(userReference, (snapshort) => {

            //   let a = snapshort.val()

            //     console.log(a);

               

                // console.log(snapshort.val().username);

                window.location.href = "./stdAttendence.html"

                

                
            })

        })

           .catch((rej) => {

            alert("try again")

        })


    }


let signUpBtn = document.getElementById("signup-button")
let loginBtn = document.getElementById("login-button")

if (signUpBtn) {
    signUpBtn.addEventListener("click", signUp)
}
if (loginBtn) {
    loginBtn.addEventListener("click", login)
}




// function stdLogin() {

//     let stdLogin = document.getElementById("login-button")
//     window.location.href = "stdEnroll.html"
// }
// stdLogin()




