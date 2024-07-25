'use client'

import React, { useEffect, useState } from 'react';
import { fetchUserLinks, fetchUserDetails } from '@/utils/firestoreService';
import { useAuth } from '../hooks/useAuth';
import PreviewNavBar from './PreviewNavBar';


interface UserLink {
    platform: string,
    url: string;
}

interface UserDetail {
  image: string,
  firstname: string,
  lastname: string,
  email: string,
}

type Props = {
  links: UserLink[],
  details: UserDetail
}// type UserLinks = UserLink[]

const Preview = ({ links, details }: Props) => {

  console.log(links, 'links')
  console.log(details, 'detail')
  return (
    <div>
      <div className='w-full h-[30vh] bg-deepBlue rounded-b-2xl py-4'>
        <PreviewNavBar />
      </div>
      <div>
        <h1>User Details</h1>
        {details? (
          <div>
            <div>{details.image}</div>
            <p>{details.firstname} {details.lastname}</p>
            <p>{details.email}</p>
          </div>
        ) : (
          <div>No Details Gotten</div>
        )}
      </div>
      <h1>User Links</h1>
      {links.length > 0 ? (
        <div>
          {links.map((link, index) => (
            <li key={index}>
              <strong>{link.platform}:</strong> <a href={link.url}>{link.url}</a>
            </li>
          ))}
        </div>
      ) : (
        <p>No links or details found.</p>
      )}
    </div>
  );
};

const PreviewWrapper: React.FC = () => {
  const {userEmail} = useAuth()
  const [links, setLinks] = useState([])
  const [details, setDetails] = useState({ image: "", firstname: "", lastname: "", email: ""})
  const userId = `${userEmail}`; 
  useEffect(() => {
    fetchUserLinks(userId)
      .then((data) => setLinks(data));
    fetchUserDetails(userId)
      .then((data) => setDetails({
        ...details,
        image: data.image,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email
      }));
  }, [userId, details])
  
  
  return <Preview links={links} details={details}/>;
};

export default PreviewWrapper;