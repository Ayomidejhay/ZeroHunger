import React from 'react'
import { Heart, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserTypeSelectorProps {
  userType: 'donor' | 'recipient';
  onUserTypeChange: (value: 'donor' | 'recipient') => void;
}

const UserTypeSelector = ({userType, onUserTypeChange} : UserTypeSelectorProps) => {
  return (
    <div>
      <Label htmlFor="userType" className="text-neutral700">
        I want to
      </Label>
      <Select value={userType} onValueChange={onUserTypeChange}>
        <SelectTrigger className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="donor">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Donate surplus food to help others</span>
            </div>
          </SelectItem>
          <SelectItem value="recipient">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Receive food donations (NGOs, community groups, or individuals)</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default UserTypeSelector