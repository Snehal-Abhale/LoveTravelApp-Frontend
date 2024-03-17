import React, { Component, useState, useEffect } from 'react';
import Header from './Header/index';
import TopPicks from './Picks';
import Collections from './Collections';
import Download from './Download';
import Media from './Media';
import Footer from './footer';
import ExperienceCard from './ExperienceCard';
import './Styles/new-york.css';

const LasVegas = (props) => {
  const [romeData, setRomeData] = useState(() => {
    // Check if data exists in local storage
    const storedData = localStorage.getItem('romeData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [experience, setExperience] = useState('');

  const updateExperience=(newExperience) =>{
    setExperience(newExperience);
  };
  useEffect(() => {
    fetch('/data') // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setRomeData(data);
        // Store data in local storage
        localStorage.setItem('romeData', JSON.stringify(data));
      })
      .catch((error) => console.error('Error fetching data:', error));

    window.scrollTo(0, 0);
  }, []);
  const filteredAllCityData= romeData.LasVegas.AllNewYorkCityData.filter(LasVegas => LasVegas.headline.toLowerCase().includes(experience.toLowerCase())
  || LasVegas.description.toLowerCase().includes(experience.toLowerCase())
  || LasVegas.sectionData.some(item => item && item.description && item.description.toLowerCase().includes(experience.toLowerCase()))
  )

   return (
    <div className="new-york-wrapper">
      <Header
        backgroundImagesData={romeData.LasVegas.backgroundImagesData}
        history={props.history}
        selectedCity={'Las Vegas'}
        navigationData={romeData.LasVegas.NewYorkNavigationData} // Ensure you have defined NewYorkNavigationData or adjust as necessary
        experience={experience}
        updateExperience={updateExperience}
      />
      <TopPicks
        headline={'Top Experiences in Las Veags'}
        pickedData={romeData.LasVegas.NewYorkData} // Ensure you have defined NewYorkData or adjust as necessary
      />
      <Collections collectionsData={romeData.LasVegas.collectionsData} /> {/* Ensure collectionsData is defined */}
      {filteredAllCityData&&
        filteredAllCityData.map(({ id, headline, description, sectionData }) => (
          <CitySection
            key={id}
            headline={headline}
            description={description}
            cardsData={sectionData}
          />
        ))}
      <Download />
      <Media />
      <Footer />
    </div>
  );
};

const CitySection = ({ headline, description, cardsData }) => (
  <div className="city-section-wrapper">
    <h2
      style={{
        textAlign: 'left'
      }}
    >
      {headline}
    </h2>
    <hr
      style={{
        backgroundColor: '#ffbb58',
        width: '75px',
        height: '2px',
        border: 'none',
        marginTop: '0px',
        marginLeft: '0px',
        marginBottom: '10px'
      }}
    />
    <p
      style={{
        color: '#545454',
        fontSize: '15.3px',
        marginTop: '0px',
        textAlign: 'left',
        lineHeight: '20px'
      }}
    >
      {description}
    </p>
    <div className="travel-card-wrapper">
      {cardsData &&
        cardsData.map(
          ({
            id,
            city,
            url,
            description,
            currency,
            currentPrice,
            ratings,
            stars,
            discount,
            cashback,
            lastPrice,
            about,
            showMore,
            highlight
          }) => (
            <ExperienceCard
              key={id}
              city={city}
              about={about}
              url={url}
              description={description}
              currency={currency}
              price={currentPrice}
              ratings={ratings}
              stars={stars}
              discount={discount}
              cashback={cashback}
              lastPrice={lastPrice}
              showMore={showMore}
              highlight={highlight}
            />
          )
        )}
    </div>
  </div>
);

export default LasVegas;
