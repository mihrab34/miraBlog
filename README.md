-name: Tech Blog
-model:2 model (post,comment)
-schema:
    *Post -author:string,date:date-time,post_title:string,article:string,like_count:number,dislike_count:number,summary:string,image:image
comments:[{*Comment -author:string,date:date-time,text:string,like_count:number,dislike_count:number,
reply:string
}]
Routes
-api
-ui
              Api routes:
    router.get(/api/blog/posts,controller.index)
    router.get(/api/blog/posts/:id,controller.blogPost)
    router.post(/api/blog/posts,controller.add)
    router.put(/api/blog/posts/:id,controller.edit)
    router.delete(/api/blog/posts/:id,controller.delete)
    router.post(/api/blog/posts/:id/like,controller.like)
    router.post(/api/blog/posts/:id/dislike,controller.dislike)
    
 
    router.get( /api/blog/posts/:id/comments,controller.comments)
    router.post(/api/blog/posts/:id/comments,controller.addComment)
    router.put(/api/blog/posts/:id/comments/:cid,controller.editComment)
    router.delete(/api/blog/posts/:id/comments/:cid,controller.deleteComment)
    
    router.post(/api/blog/posts/:id/comments/:cid/reply,controller.replyComment)
    ui routes
    /blog/posts =>index
    /blog/posts/edit/:id =>edit
    /blog/posts/add=>add
    /blog/posts/:id =>post
Components
   *App 
   *Navbar:
   *PostForm:# props- postAction(edit,add)
             # eventhandler-onChange,handleSubmit
             # endPiont-‘/api/blog/posts’(POST), ‘/api/blog/posts/:id’(PUT), ‘/api/blog/posts/:id’(GET)
        
   *PostList : # state -posts(array):[]
               # apiPoints -/api/blog/posts'(GET) 
   *Post:# endpoint-/api/blog/posts/:id/like (POST),/api/blog/posts/:id/dislike (POST)
         #props -post 
         #Link to=/api/bog/post/:id (read more)postdetail
   *PostDetail:#props - post
               #endpoint -/api/blog/posts/:id (GET)
               
   *Comment :# endpoint -/api/blog/posts/:id/comments (POST),(/api/blog/posts/:id/comments/:cid(PUT),
          (/api/blog/posts/:id/comments/:cid,controller.deleteComment (delete)
             #props comment
   *CommentList: # state -comments(array):[]
                # apiPoints -/api/blog/posts/:id/comments'(GET) 
   *CommentForm :#props CommentAction(add,edit)
                 # eventhandler-onChange,handleSubmit
                 # endPiont-‘/api/blog/posts/:id/comments’(POST), ‘/api/blog/posts/:id/comments/:cid’(PUT)
   *Reaction(like & dislike) :# endPoint-/api/blog/posts/:id/like(POST),/api/blog/posts/:id/dislike(POST)
    
   *ReactionCount(number of likes and dislike)
   *Replylist :# state replys(array):[]
               # # apiPoints -/api/blog/posts/:id/comments/:cid/reply'(GET) 
   *ReplyForm :# props replyAction(add)
               #enpoint-/api/blog/posts/:id/comments/:cid/reply(POST)
   *ReplyButton
   *Reply #apiPoints -/api/blog/posts/:id/comments/:cid/reply/:rid'(GET) 
   *PopularPost
   * LatestPost
   * Footer
component tree
 App
   Navbar
   PostList
      -Post
         -ReactionCount
         -Reaction
   PostForm
   PostDetail
       -ReactionCount
       -Reaction
       -CommentList
       -Comment
              -ReplyButton
              -ReplyForm
              -ReplyList
                 -Reply
           -CommentForm
     
     <!-- Testing Abort Signal With React useEffect
     setTimeOut(() => new AbortController().signal ,200) -->

     <!-- to umount a React component with AbortController
     return ()=> new AbortController().signal -->
