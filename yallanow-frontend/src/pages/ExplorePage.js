import React from 'react';
import EventCard from '../components/EventCard';

import getMockRecommendations from '../data/readRecommendationData';

const ExplorePage = () => {

  // Temp data
  const recommData = getMockRecommendations();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Explore Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommData.recommendations.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;