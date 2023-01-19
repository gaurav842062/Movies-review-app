import { Badge } from "@material-ui/core"
import { img_300, unavailable } from "../../config/config"
import ContentModal from "../ContentModal/ContentModal"
import "./SingleContent.css" 

export const SingleContent = ({ id, title , poster, date, media_type, vote_average }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average>5.99 ? "primary" : "secondary"} />
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable } alt={title} / >
      <b className= {title.length > 16 ? "title-1" : "title"}>{title}</b>
      <div className="details">
      <span>{ media_type === "movie"? "Movie" : "TV Series"  }</span>
      <span>{date}</span>
      </div>
      </ContentModal>
  )
}



