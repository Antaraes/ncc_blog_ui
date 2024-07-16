'use client';
import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '@/api'; // Assuming you have these API functions
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';

export default function ProfileComponent() {
  const { data, isLoading } = useFetch('get-profile', getProfile);
  const [formData, setFormData] = useState<any>({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        email: data.data.email,
        country_code: data.data.country_code,
        phone_number: data.data.phone_number,
        role_id: data.data.role_id._id,
        photo: data.data.photo,
      });
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setIsModified(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof Blob) {
        form.append(key, value);
      } else if (typeof value === 'string') {
        form.append(key, value);
      } else {
        form.append(key, String(value || ''));
      }
    });

    try {
      console.log(formData);
      const response = await updateProfile(data.data._id, form);
      setIsModified(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally handle the error by showing a message to the user
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center w-full ">
        <Spinner lg />
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3 ">
            <div className="max-h-52 max-w-52">
              <Image
                src={
                  formData.photo !== null
                    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${formData.photo}`
                    : '/assets/member.png'
                }
                alt="Avatar"
                width="80"
                height="80"
                className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 object-cover"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {formData.first_name} {formData.last_name}
              </h1>
              <Label htmlFor="photo" className="cursor-pointer">
                Change photo
              </Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <Card>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="country_code">Country Code</Label>
                  <Input
                    id="country_code"
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="pt-6">
            <Button type="submit" disabled={!isModified}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
