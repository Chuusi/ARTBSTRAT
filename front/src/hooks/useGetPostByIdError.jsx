export const useGetPostByIdError = (result, setResPost, setPostList, updatedPostList) => {
    
    if(result?.status == 200){
        updatedPostList.push(result.data);
    }
    else{
        console.log("No sabemos hacer eso");
    }
}