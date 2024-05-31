export const useAddBasketError = (resBasket, setResBasket) => {
    if(resBasket.status == 200){
        console.log("Todo bien", resBasket);
        document.getElementById("basketUnits-basketLogo").innerHTML= resBasket?.data?.basket.length == 0 ? "" : resBasket?.data?.basket.length;
        document.getElementById("basketUnits-basketLogo").style.display= resBasket?.data?.basket.length == 0 ? "none" : "block";
        setResBasket(() => ({}))
    }

    else{
        console.log("Oh oh...", resBasket);
    }
}
