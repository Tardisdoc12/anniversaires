import BirthdayAnimationComponent from './BirthdayAnimationComponent/BirthdayAnimation';
import React, { useState, useEffect } from 'react';





function BirthdayComponent(props) {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fonction pour obtenir les anniversaires du jour
    async function fetchBirthdaysOfToday() {
      try {
        const response = await fetch('/api/birthdays/today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBirthdays(data); // Stocker les anniversaires dans l'état
      } catch (error) {
        console.error('Error fetching birthdays:', error);
        setError(error); // Gérer les erreurs
      } finally {
        setLoading(false); // Indiquer que le chargement est terminé
      }
    }

    fetchBirthdaysOfToday();
  }, []);

  let fullName = `${props.currentBirthday.firstname} ${props.currentBirthday.lastname}`;
  return (
    <div className="pt-44 w-1/2" style={{ background: props.currentColor }}>
      <div className="absolute left-[5%] top-[20%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-[40%] top-[30%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="absolute left-[5%] top-[50%]">
        <img
          className="animate-zoom-in-zoom-out"
          alt="Background star"
          src="/images/star.svg"
        />
      </div>
      <div className="flex flex-col h-full">
        <BirthdayAnimationComponent currentColor={props.currentColor} />
        <div className="w-full text-center relative bottom-16">
          <span className="font-bison text-[95px]">{fullName}</span>
        </div>
      </div>
    </div>
  );
}

export default BirthdayComponent;
