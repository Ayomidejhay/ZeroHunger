import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const PersonalInfoFields = ({ 
  firstName, 
  lastName, 
  onFirstNameChange, 
  onLastNameChange 
}: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="firstName" className="text-neutral700">
          First Name
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          required
          placeholder="John"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen"
        />
      </div>
      <div>
        <Label htmlFor="lastName" className="text-neutral700">
          Last Name
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          required
          placeholder="Doe"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen"
        />
      </div>
    </div>
  )
}

export default PersonalInfoFields