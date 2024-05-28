export const useAddCommentError = (resAddComment, setResAddComment, setCommentList, commentList) => {

    if(resAddComment?.status == 200) {
        console.log("He entrado en el if 200", resAddComment);
        setCommentList([...commentList, resAddComment.data.commentRes]);
        setResAddComment({})
    }

    if(resAddComment?.response?.status == 500){
        console.log(resAddComment);
    }
}

