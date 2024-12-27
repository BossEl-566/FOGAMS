import React from 'react';
import { Button } from 'flowbite-react';
import { CiCalendarDate } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashEvents() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-4">
      {/* Add New File Button */}
      {currentUser.isAdmin && (
        <Link to="/add-event">
        <div className="flex justify-end items-start mb-4 gap-2">
          <Button
            type="button"
            className="w-auto flex items-center gap-2"
            outline
            gradientDuoTone="purpleToBlue"
          >
            <CiCalendarDate className="text-xl mr-2" /> {/* Adjusted text size */}
            Add New Event
          </Button>
        </div>
        </Link>
      )}
    </div>
  );
}
