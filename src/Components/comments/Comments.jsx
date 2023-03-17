import React, { useState } from "react"
import './_comments.scss'
import Comment from "../comment/comment"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addComment, getCommentsOfVideoById } from "../../redux/actions/comments.action"
export const Comments =({videoId,totalComments})=>{

    const comments = useSelector(state => state.commentList.comments)

    const _comments = comments?.map(
        comment => comment.snippet.topLevelComment.snippet
     )

const [text,setText]=useState('');

const handleComment=(e)=>{
    e.preventDefault();

    if(text.length===0) return 

    dispatch(addComment(videoId,text))
    setText('');
}

const dispatch=useDispatch()

useEffect(()=>{
dispatch(getCommentsOfVideoById(videoId))
},[videoId,dispatch])

const { photoURL }= useSelector(state => state.auth?.user)

return(
<div className="comments">
{totalComments} comments

<div className="comments__form d-flex w-100 my-2">

 <img src={photoURL} alt="" 
 className="rounded-circle mr-3"
 />

 <form onSubmit={handleComment} className="d-flex flex-grow-1">
    <input type="text" 
    className="flex-grow-1" 
    placeholder="Write a comment..." 
    value={text}
    onChange={e=>setText(e.target.value)}
    />
    <button className="border-0 p-2">comment</button>
 </form>

 </div>
 <div className="comments__list">
    {
        _comments?.map((comment,i)=>(
            <Comment comment={comment} key={i}/>
        ))
    }
 </div>
</div>
)
}