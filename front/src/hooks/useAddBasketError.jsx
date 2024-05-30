export const useAddBasketError = (resBasket, setResBasket) => {
    if(resBasket.status == 200){
        console.log("Todo bien", resBasket);
        setResBasket(() => ({}))
    }

    else{
        console.log("Oh oh...", resBasket);
    }
}
