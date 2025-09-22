import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { createClient } from 'pexels';
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

  const {videoID } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${API_KEY}`;

    await fetch(videoDetails_url).then(response => response.json()).then(data => setApiData(data.items[0]));
  }

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url).then(response => response.json()).then(data => setChannelData(data.items[0]))

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&videoId=${videoID}&key=${API_KEY}`
    await fetch(comment_url).then(response => response.json()).then(data => setCommentData(data.items))

  }

  useEffect(() => {

    fetchVideoData();

    // const client = createClient('ERtPP3g9KGcJAPzaIb77FjRyRmdg7aQG0kSic6tEw3DjauPj9FgWwcyl'); // Replace with actual API key

    // client.videos.popular({ per_page: 1 })
    //   .then(response => {
    //     if (response && response.videos && response.videos.length > 0) {
    //       console.log(response);
    //       setVideo(response.videos[0].video_files[2].link); // Store first video in state
    //       setVideoTitle(response.videos[0].url.split('/').filter(Boolean).pop().replace(/-/g, ' ').toUpperCase());
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching popular videos:', error);
    //   });
  }, [videoID]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  console.log(apiData);
  // console.log(video);

  return (
    <div className="play-video">
      {/* <video src={video} controls autoPlay={false} muted /> */}
      <iframe width="750" height="422" src={`https://www.youtube.com/embed/${videoID}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData ? apiData.snippet.title : ""}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "1500"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 Days"}</p>
        <div>
          <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : "125"}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" /></span>
          <span><img src={save} alt="" /></span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Kami Presents"}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        {/* <p>Channel that makes learning easy</p>
      <p>Subscribe to watch more similar content related to this</p> */}
        <p>{apiData ? apiData.snippet.description : "Channel"}</p>
        <hr />
        <h4>{apiData ? apiData.statistics.commentCount : ""} Comments</h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default PlayVideo