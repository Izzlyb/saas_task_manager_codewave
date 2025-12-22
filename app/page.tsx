

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = isAuthenticated();

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
            <p>Your personal workspace</p>
            <p className='text-5xl md:text-6xl'>
              for <span className='text-blue-600'>better productivity</span>
            </p>
          </h1>
          <p className='mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
            vero repellendus corporis facere iusto mollitia esse, possimus
            maxime ut dolore!
          </p>

          <div className='flex items-center justify-center gap-4 mt-6'>
            {isLoggedIn ? (
              <div>
                <Button>
                  <Link href='/workspace'>Go to workspace</Link>
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant='outline'
                  // asChild
                  className='w-[200px] shadow-2xl'
                >
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <p>Register to Get Started</p>
                <Button variant='outline' className='w-[200px]  shadow-2xl'>
                  <RegisterLink>Register</RegisterLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


