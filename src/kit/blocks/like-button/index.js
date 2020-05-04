import LikeButton from "./LikeButton";

$('.js-like-button').each((_, like)=>new LikeButton($(like)));
