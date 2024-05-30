export const useAdminUserError = (resAdmin, setResAdmin) => {
    if(resAdmin.status == 200){
        console.log("todo gucci", resAdmin);
        setResAdmin(() => ({}))
    }
    else{
        console.log("algo pasa");
    }
}
