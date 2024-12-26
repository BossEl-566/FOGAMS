import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaFileUpload } from 'react-icons/fa';
import ResourcePopover from './ResourcePopover';

export default function DashResource() {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleButtonClick = () => setPopoverVisible(true);
  const handleClose = () => setPopoverVisible(false);

  return (
    <div className="flex justify-end items-start p-4">
      <Button
        type="button"
        className="w-auto flex items-center gap-2"
        outline
        gradientDuoTone="purpleToBlue"
        onClick={handleButtonClick}
      >
        <FaFileUpload className="text-lg" />
        Add New File
      </Button>

      {isPopoverVisible && <ResourcePopover onClose={handleClose} />}
    </div>
  );
}
