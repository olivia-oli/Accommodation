import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import Card from '../Components/Cards/Card.jsx'
import "./Home.css";
import GiftCard from "../Components/GiftCard/GiftCard.jsx";
const Home =() => {
    return (
        <>
            <Header />
            <Hero />
            
            
            <div className="text-divider">

      <h1>Inspiration for your next trip</h1>
      </div>
      
      <div className="home-section">
        <Card
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1004016866936810993/original/8f2b4f43-748d-4373-923f-bb1b742f4dce.jpeg?im_w=720"
          alt=""
          title="Dubai"
          description="UAE"
        />
        <Card
          src="https://a0.muscache.com/im/pictures/miso/Hosting-922391321344014793/original/be9808b0-7062-4c64-9bab-8a081a68c958.jpeg?im_w=720"
          alt=""
          title="Miami"
          description="US"
         
        />
        <Card
          src="https://a0.muscache.com/im/pictures/miso/Hosting-689791878132320331/original/0793b27c-c944-4d84-9eaa-741c8eb6e692.jpeg?im_w=720"
          alt=""
          title="Paris"
          description="France"
         
        />
        <Card
          src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034668712443246387/original/b21459fa-2351-405b-b1ff-f718d03fa5f2.jpeg?im_w=720"
          alt=""
          title="Cape Town"
          description="South Africa"
         
        />
        <Card
          src="https://a0.muscache.com/im/pictures/43a6ee79-6685-4c3f-bb4d-8db164406006.jpg?im_w=720"
          alt=""
          title="Johannesburg"
          description="South Africa"
       
        />
        </div>
        <GiftCard/>
        <Footer/>
        
     
        </>
    )
}
export default Home;