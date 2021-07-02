
// TODO: Improve the config (i.e. adding callback)
export const uiConfig = firebase => {
    return {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        tosUrl: "/terms-of-service",
        privacyPolicyUrl: "/privacy-policy",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
    }
}
