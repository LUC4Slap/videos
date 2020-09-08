import React from 'react';
import { Channel } from '../services/EventService';

export default function VideoList(props) {
  const { videos } = props || [];

  function handleClick(video){
    Channel.emit('video:select', video)
  }

  return (
    <ul className="video-list">
      { videos.map(video => (
        <li className="video" key={video.id} onClick={handleClick.bind(this, video)}>
          <img src={video.img} alt={video.name} />
          <div>{video.name}</div>
        </li>
      ))}
    </ul>
  )
}