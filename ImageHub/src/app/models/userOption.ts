export class UserOptions {
    privateModePassword: String
    constructor(public cameraOption: boolean, public locationOption: boolean, public privateMode: boolean) {
        if (!privateMode) {
            this.privateModePassword = null
        }
    }
}
