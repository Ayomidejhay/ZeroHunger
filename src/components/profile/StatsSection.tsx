import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext';
import { Star, Heart, User, Award } from "lucide-react";

const StatsSection = () => {
    const { profile } = useAuth();
    const isDonor = profile?.user_type === 'donor';
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Your Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-defaultgreen/10 rounded-lg">
            <Star className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
            <div className="text-2xl font-bold text-defaultgreen">4.8</div>
            <div className="text-sm text-neutral-600">Rating</div>
          </div>
          
          {isDonor ? (
            <>
              <div className="p-4 bg-defaultorange/10 rounded-lg">
                <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultorange">47</div>
                <div className="text-sm text-neutral600">Items Donated</div>
              </div>
              <div className="p-4 bg-defaultgreen/10 rounded-lg">
                <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultgreen">23</div>
                <div className="text-sm text-neutral600">People Helped</div>
              </div>
              <div className="p-4 bg-defaultorange/10 rounded-lg">
                <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultorange">156</div>
                <div className="text-sm text-neutral600">lbs Saved</div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-orange/10 rounded-lg">
                <Heart className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultorange">12</div>
                <div className="text-sm text-neutral600">Items Received</div>
              </div>
              <div className="p-4 bg-defaultgreen/10 rounded-lg">
                <User className="h-8 w-8 text-defaultgreen mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultgreen">8</div>
                <div className="text-sm text-neutral600">Donors Met</div>
              </div>
              <div className="p-4 bg-defaultorange/10 rounded-lg">
                <Award className="h-8 w-8 text-defaultorange mx-auto mb-2" />
                <div className="text-2xl font-bold text-defaultorange">34</div>
                <div className="text-sm text-neutral600">lbs Received</div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsSection