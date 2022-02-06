import React from 'react';
import UserVendorFooter from "../../../components/UserVendorFooter/UserVendorFooter";
import UserVendorHeader from "../../../components/UserVendorHeader/UserVendorHeader";
import VerifyOtp from '../../../components/VerifyOTP/VerifyOtp';


const VerifyAccount = () => {
     return (
       <div>
         <UserVendorHeader />
         <VerifyOtp />
         <UserVendorFooter />
       </div>
     );
    
};

export default VerifyAccount;
