import "./Hero.scss";
import HeroImg from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <div className="hero_container container">
      <div className="hero_img">
        <img src={HeroImg} alt="" />
      </div>
      <div className="hero_text">
        <h1>Hello I'm Kadir</h1>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
    </div>
  );
};

export default Hero;
