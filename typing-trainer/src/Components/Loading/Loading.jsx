import LoadingImg from '../../images/loading.gif'
import './Loading.scss';

const Loading = () => {
  return (
    <div className='loading-container'>
        <p className="loading-text">Loading</p>
        <img className="loading-img" src={LoadingImg} alt="" />
    </div>
  )
}

export default Loading