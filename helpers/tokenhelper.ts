class tokenHelper{
    token: string
    constructor(){
        this.token = ""
    }
    setToken(newtoken: string){
        this.token = newtoken
    }
    getToken(){
        var temp = this.token
        return this.token
    }
}
const tokenHelperInstance = new tokenHelper()
export default tokenHelperInstance
