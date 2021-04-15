import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

export class Firebase{
    constructor(){

        this._config = {
            apiKey: "AIzaSyAmJ9uJSQwev2mS38WOInPPkGojqlgl0PA",
            authDomain: "whatsapp-clone-a1f92.firebaseapp.com",
            projectId: "whatsapp-clone-a1f92",
            storageBucket: "whatsapp-clone-a1f92.appspot.com",
            messagingSenderId: "805337863828",
            appId: "1:805337863828:web:06782930ac067e793dc681",
            measurementId: "G-P7QJQ18RBL"
        }
        this.init()
    }
    init(){
        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            })
            window._initializedFirebase = true
        }
        
    }
    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }
    initAuth(){
        return new Promise((s,f)=>{
            let provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken;
                let user = result.user

                s({
                    user, token
                })
            }).catch(err=>{
                f(err)
            })
        })
    }
    
}