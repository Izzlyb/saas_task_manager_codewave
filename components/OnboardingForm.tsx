"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from '@/lib/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { countryList } from '@/utils/countriesList';
import Image from 'next/image';
import { industryTypesList, roleList } from '@/utils';
import { Textarea } from './ui/textarea';

type OnboardingFormProps = {
  name: string;
  email: string;
  image?: string;
};

type UserDataType = z.infer<typeof userSchema>;

const OnboardingForm = ({
  name, 
  email,
  image,
} : OnboardingFormProps) => {

  const [pending, setPending] = useState(false);

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
      defaultValues: {
        about: "",
        name: name || "",
        email: email,
        image: image || "",
        role: "",
        industryType: "",
    }
  })

  const onSubmit = async (data: UserDataType) => {
    console.log("submit form for processing...", data)
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background'>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Welcome to CW TaskMgr</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ad!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col justify-center space-y-5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='enter your full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Populate Country List */}
                        <div className='max-h-48 max-w-[300px] overflow-auto'>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <div className='flex flex-row items-center'>
                                <img
                                  src={country.flag}
                                  alt={country.name}
                                  className='w-4 h-3'
                                />
                                <span className='pl-2'>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='industryType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select industry' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Populate Country List */}
                          <div className='max-h-48 max-w-[300px] overflow-auto'>
                            {industryTypesList.map((industry, idx) => (
                              <SelectItem key={idx} value={industry}>
                                <p className='pl-2'>{industry}</p>
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Populate Country List */}
                          <div className='max-h-48 max-w-[300px] overflow-auto'>
                            {roleList.map((role, idx) => (
                              <SelectItem key={idx} value={role}>
                                <div className='flex flex-row items-center'>
                                  <span className='pl-2'>{role}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='about'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='Tell us about yourself'
                        className='resize-none'
                      ></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={pending}>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
