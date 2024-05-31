export const useDeleteBasketError = (resDelete, setResDelete, setBasketUser) => {
    if(resDelete.status == 200){
        let newProductList = [...resDelete?.data?.basket];
        document.getElementById("basketUnits-basketLogo").innerHTML= resDelete?.data?.basket.length == 0 ? "" : resDelete?.data?.basket.length;
        document.getElementById("basketUnits-basketLogo").style.display= resDelete?.data?.basket.length == 0 ? "none" : "block";
        setBasketUser([...newProductList])
        setResDelete(() => ({}))
    }else{
        console.log(resDelete);
    }
}
