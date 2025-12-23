"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { workspaceSchema } from "@/lib/schema";
import { createWorkspace } from "@/app/actions/workspace";
import { useRouter } from "next/navigation";

export type WorkspaceDataType = z.infer<typeof workspaceSchema>;

const CreateWorkspaceForm = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<WorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: WorkspaceDataType) => {
    try {
      setPending(true);
      const { data: response } = await createWorkspace(data);
      
      toast.success("Workspace created successfully!");

      router.push(`/workspace/${response?.id as string}`);

    } catch (error) {
      setPending(false);
      toast.error("somthing went wrong on create workspace form. Try again.");
      console.error(error);
    }
    console.log("🎉submit Create Workspace form for processing...🧨");
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background'>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Create New Workspace</CardTitle>
          <CardDescription>
            Set up a new workspace for you and your team to get going.
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
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder='enter workspace name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='Workspace Description'
                        className='resize-none'
                      ></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Button
                  type='submit'
                  disabled={pending}
                  className='bg-blue-800 hover:bg-blue-600'
                >
                  Submit
                </Button>
                <Button
                  type='submit'
                  disabled={pending}
                  className='bg-blue-800 hover:bg-blue-600'
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWorkspaceForm;
