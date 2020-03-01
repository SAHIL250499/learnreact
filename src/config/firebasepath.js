import fire from "./fire";
import "firebase/storage";

const userRef = fire.database().ref("users");

const storageRef = fire.storage().ref("images/");

export { userRef, storageRef };
