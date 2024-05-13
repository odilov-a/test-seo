import { useEffect, useState } from "react";
import { notification } from "antd";
import { useHooks, usePost } from "hooks";

import { DislikeIcon, DropdownIcon, LikeIcon, Liked, Disliked } from "assets/images/icons";

import './style.scss'
import { storage } from "services";

// const Comment = ({ item }: any) => {
//   const { mutate } = usePost();
//   const { get, t, queryClient } = useHooks();
//   const [OpenComment, setOpenComment] = useState(false)

//   const [likes, setLikes] = useState(get(item, "like"));
//   const [dislikes, setDislikes] = useState(get(item, "dislike"));

//   //@ts-ignore
//   const initialUserReaction = localStorage.getItem(`comments`) || "[]";
//   const [userReaction, setUserReaction] = useState(initialUserReaction);

//   useEffect(() => {
//     //@ts-ignore
//     const commentState = JSON.parse(localStorage.getItem(`comment_${item._id}`));
//     if (commentState) {
//       setLikes(commentState.likes);
//       setDislikes(commentState.dislikes);
//       setUserReaction(commentState.userReaction);
//     }
//   }, [item._id]);

//   const handleLike = () => {
//     if (userReaction === "like") {
//       setLikes(likes - 1);
//       setUserReaction("");
//       mutate(
//         { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes - 1, userId: item._id } },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries({
//               queryKey: [`feedbacks`],
//             });
//             notification["success"]({
//               message: "Успешно!",
//               duration: 2,
//             });
//           },
//           onError: (error: any) => {
//             notification["error"]({
//               message: get(error, "errorMessage", "Произошло ошибка!"),
//               duration: 2,
//             });
//           },
//         }
//       )
//     } else {
//       setLikes(likes + 1);
//       setUserReaction("like");
//       mutate(
//         { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes + 1, userId: item._id } },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries({
//               queryKey: [`feedbacks`],
//             });
//             notification["success"]({
//               message: "Успешно!",
//               duration: 2,
//             });
//           },
//           onError: (error: any) => {
//             notification["error"]({
//               message: get(error, "errorMessage", "Произошло ошибка!"),
//               duration: 2,
//             });
//           },
//         }
//       )
//       if (userReaction === "dislike") {
//         setDislikes(dislikes - 1);
//         mutate(
//           { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes - 1, userId: item._id } },
//           {
//             onSuccess: () => {
//               queryClient.invalidateQueries({
//                 queryKey: [`feedbacks`],
//               });
//               notification["success"]({
//                 message: "Успешно!",
//                 duration: 2,
//               });
//             },
//             onError: (error: any) => {
//               notification["error"]({
//                 message: get(error, "errorMessage", "Произошло ошибка!"),
//                 duration: 2,
//               });
//             },
//           }
//         )
//       }
//     }
//   };

//   const handleDislike = () => {
//     if (userReaction === "dislike") {
//       setDislikes(dislikes - 1);
//       setUserReaction("");
//       mutate(
//         { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes - 1, userId: item._id } },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries({
//               queryKey: [`feedbacks`],
//             });
//             notification["success"]({
//               message: "Успешно!",
//               duration: 2,
//             });
//           },
//           onError: (error: any) => {
//             notification["error"]({
//               message: get(error, "errorMessage", "Произошло ошибка!"),
//               duration: 2,
//             });
//           },
//         }
//       )
//     } else {
//       setDislikes(dislikes + 1);
//       setUserReaction("dislike");
//       mutate(
//         { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes + 1, userId: item._id } },
//         {
//           onSuccess: () => {
//             queryClient.invalidateQueries({
//               queryKey: [`feedbacks`],
//             });
//             notification["success"]({
//               message: "Успешно!",
//               duration: 2,
//             });
//           },
//           onError: (error: any) => {
//             notification["error"]({
//               message: get(error, "errorMessage", "Произошло ошибка!"),
//               duration: 2,
//             });
//           },
//         }
//       )
//       if (userReaction === "like") {
//         setLikes(likes - 1);
//         mutate(
//           { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes - 1, userId: item._id } },
//           {
//             onSuccess: () => {
//               queryClient.invalidateQueries({
//                 queryKey: [`feedbacks`],
//               });
//               notification["success"]({
//                 message: "Успешно!",
//                 duration: 2,
//               });
//             },
//             onError: (error: any) => {
//               notification["error"]({
//                 message: get(error, "errorMessage", "Произошло ошибка!"),
//                 duration: 2,
//               });
//             },
//           }
//         )
//       }
//     }
//   };

//   return (
//     <>
//       <div className="main_comment mb-[25px]">
//         <div className="comment_user-img">{get(item, "name").split(" ").map((word: any) => word.charAt(0).toUpperCase()).join("")}</div>
//         <div className="comment_wrapper">
//           <span className="comment_top">
//             <p className="comment_owner">{get(item, "name")}</p>
//             <span className="comment_date">{get(item, "createdAt", "").slice(0, 10).replaceAll("-", ".")}</span>
//           </span>
//           <div className="comment_text">
//             {get(item, "question")}
//           </div>
//           <div className="comment_bottom">
//             <span className="cursor-pointer" onClick={handleLike}>
//               {userReaction === "like" ? <Liked /> : <LikeIcon />}
//               <p>{likes ? likes : get(item, "like")}</p>
//             </span>
//             <span className="cursor-pointer" onClick={handleDislike}>
//               {userReaction === "dislike" ? <Disliked /> : <DislikeIcon />}
//               <p>{dislikes ? dislikes : get(item, "dislike")}</p>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>

//   );
// };
const Comment = ({ item }: any) => {

  const { mutate } = usePost();
  const { get, t, queryClient } = useHooks();
  const [OpenComment, setOpenComment] = useState(false)

  const [likes, setLikes] = useState(get(item, "like"));
  const [dislikes, setDislikes] = useState(get(item, "dislike"));

  //@ts-ignore
  const initialUserReaction = localStorage.getItem(`comment_${item._id}`)?.userReaction || "";
  const [userReaction, setUserReaction] = useState(initialUserReaction);

  useEffect(() => {
    //@ts-ignore
    const commentState = JSON.parse(localStorage.getItem(`comment_${item._id}`));
    if (commentState) {
      setLikes(commentState.likes);
      setDislikes(commentState.dislikes);
      setUserReaction(commentState.userReaction);
    }
  }, [item._id]);

  useEffect(() => {
    localStorage.setItem(`comment_${item._id}`, JSON.stringify({ likes, dislikes, userReaction }));
  }, [item._id, likes, dislikes, userReaction]);

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes(likes - 1);
      setUserReaction("");
      mutate(
        { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes - 1, userId: item._id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`feedbacks`],
            });
            notification["success"]({
              message: "Успешно!",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      )
    } else {
      setLikes(likes + 1);
      setUserReaction("like");
      mutate(
        { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes + 1, userId: item._id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`feedbacks`],
            });
            notification["success"]({
              message: "Успешно!",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      )
      if (userReaction === "dislike") {
        setDislikes(dislikes - 1);
        mutate(
          { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes - 1, userId: item._id } },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [`feedbacks`],
              });
              notification["success"]({
                message: "Успешно!",
                duration: 2,
              });
            },
            onError: (error: any) => {
              notification["error"]({
                message: get(error, "errorMessage", "Произошло ошибка!"),
                duration: 2,
              });
            },
          }
        )
      }
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes(dislikes - 1);
      setUserReaction("");
      mutate(
        { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes - 1, userId: item._id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`feedbacks`],
            });
            notification["success"]({
              message: "Успешно!",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      )
    } else {
      setDislikes(dislikes + 1);
      setUserReaction("dislike");
      mutate(
        { method: "patch", url: `feedbacks/action/${item._id}`, data: { dislike: dislikes + 1, userId: item._id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`feedbacks`],
            });
            notification["success"]({
              message: "Успешно!",
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", "Произошло ошибка!"),
              duration: 2,
            });
          },
        }
      )
      if (userReaction === "like") {
        setLikes(likes - 1);
        mutate(
          { method: "patch", url: `feedbacks/action/${item._id}`, data: { like: likes - 1, userId: item._id } },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [`feedbacks`],
              });
              notification["success"]({
                message: "Успешно!",
                duration: 2,
              });
            },
            onError: (error: any) => {
              notification["error"]({
                message: get(error, "errorMessage", "Произошло ошибка!"),
                duration: 2,
              });
            },
          }
        )
      }
    }
  };

  return (
    <>
      <div className="main_comment mb-[25px]">
        <div className="comment_user-img">{get(item, "name").split(" ").map((word: any) => word.charAt(0).toUpperCase()).join("")}</div>
        <div className="comment_wrapper">
          <span className="comment_top">
            <p className="comment_owner">{get(item, "name")}</p>
            <span className="comment_date">{get(item, "createdAt", "").slice(0, 10).replaceAll("-", ".")}</span>
          </span>
          <div className="comment_text">
            {get(item, "question")}
          </div>
          <div className="comment_bottom">
            <span className="cursor-pointer" onClick={handleLike}>
              {userReaction === "like" ? <Liked /> : <LikeIcon />}
              <p>{likes ? likes : get(item, "like")}</p>
            </span>
            <span className="cursor-pointer" onClick={handleDislike}>
              {userReaction === "dislike" ? <Disliked /> : <DislikeIcon />}
              <p>{dislikes ? dislikes : get(item, "dislike")}</p>
            </span>
          </div>
          {get(item, "answer") && <>
            <button
              onClick={() => setOpenComment(!OpenComment)}
              className="replies_opener">
              <span className={`${OpenComment ? `rotate-180` : ``} opener_svg`}>
                <DropdownIcon />
              </span>
              <span>{t("Javobni o'qish")}</span>
            </button>
            <div className={`replied_comments ${OpenComment ? 'block' : 'hidden'}  }`}>
              <div className="main_comment">
                <span className="comment_user-img">{t("A")}</span>
                <div className="comment_wrapper">
                  <span className="comment_top">
                    <p className="comment_owner">{t("Admin")}</p>
                    {/* <span className="comment_date">2 kun oldin</span> */}
                  </span>
                  <div className="comment_text">
                    {get(item, "answer")}
                  </div>
                  {/* <div className="comment_bottom">
                    <span>
                      <LikeIcon />
                      <p>98</p>
                    </span>
                    <span>
                      <DislikeIcon />
                      <p>98</p>
                    </span>
                  </div> */}

                </div>
              </div>
            </div>
          </>}
        </div>
      </div>
    </>
  );
};

export default Comment;