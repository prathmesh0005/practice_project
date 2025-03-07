import backImg from '../assets/background.jpg'

export default function Home(){
  return(
    <>
      <div className='d-flex justify-content-center align-item-center vh-100'>
       <img src={backImg} alt="Not found" className="img-fluid w-100 h-100 object-fit-cover"/>
      </div>
    </>
  )
}