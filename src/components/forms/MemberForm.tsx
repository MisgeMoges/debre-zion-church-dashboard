// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";

// // Expanded Member interface to include all fields
// interface Member {
//   id?: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   profileImage: string;
//   memberCategory: string;
//   maritalStatus: string;
//   gender: string;
//   membershipType: string;
//   christeningName: string;
//   spiritualFatherName: string;
//   fcmToken: string;
//   dateOfBirth: string;
//   nationality: string;
//   address: string;
//   postcode: string;
//   mobileNumber: string;
//   emergencyContactName: string;
//   emergencyContactRelation: string;
//   emergencyContactPhone: string;
//   membershipCommitmentConfirmed: boolean;
//   consentContactChurch: boolean;
//   consentDataUse: boolean;
//   membershipApplicationSignature: string;
//   membershipApplicationDate: string;
//   applicationReceivedDate: string;
// }

// interface MemberFormProps {
//   member?: Member;
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (member: Member) => void;
// }

// export function MemberForm({ member, open, onClose, onSubmit }: MemberFormProps) {
//   const { toast } = useToast();
//   const [step, setStep] = useState(1);
  
//   const [formData, setFormData] = useState<Member>({
//     id: member?.id || "",
//     email: member?.email || "",
//     firstName: member?.firstName || "",
//     lastName: member?.lastName || "",
//     middleName: member?.middleName || "",
//     profileImage: member?.profileImage || "",
//     memberCategory: member?.memberCategory || "",
//     maritalStatus: member?.maritalStatus || "",
//     gender: member?.gender || "",
//     membershipType: member?.membershipType || "",
//     christeningName: member?.christeningName || "",
//     spiritualFatherName: member?.spiritualFatherName || "",
//     fcmToken: member?.fcmToken || "",
//     dateOfBirth: member?.dateOfBirth || "",
//     nationality: member?.nationality || "",
//     address: member?.address || "",
//     postcode: member?.postcode || "",
//     mobileNumber: member?.mobileNumber || "",
//     emergencyContactName: member?.emergencyContactName || "",
//     emergencyContactRelation: member?.emergencyContactRelation || "",
//     emergencyContactPhone: member?.emergencyContactPhone || "",
//     membershipCommitmentConfirmed: member?.membershipCommitmentConfirmed || false,
//     consentContactChurch: member?.consentContactChurch || false,
//     consentDataUse: member?.consentDataUse || false,
//     membershipApplicationSignature: member?.membershipApplicationSignature || "",
//     membershipApplicationDate: member?.membershipApplicationDate || new Date().toISOString(),
//     applicationReceivedDate: member?.applicationReceivedDate || new Date().toISOString(),
//   });

//   const handleChange = <T extends keyof Member>(field: T, value: Member[T]) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Check if it's not the last step
//     if (step < 6) {
//       setStep(prev => prev + 1);
//       return;
//     }
    
//     // Final submission logic for the last step
//     if (!formData.firstName || !formData.email) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     onSubmit(formData);
//     toast({
//       title: "Success",
//       description: `Member ${member ? 'updated' : 'created'} successfully.`,
//     });
//     onClose();
//   };
  
//   const renderFormContent = () => {
//     switch (step) {
//       // Step 1: Personal Details
//       case 1:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name *</Label>
//                 <Input
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={(e) => handleChange("firstName", e.target.value)}
//                   placeholder="Enter first name"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name *</Label>
//                 <Input
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={(e) => handleChange("lastName", e.target.value)}
//                   placeholder="Enter last name"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email *</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="middleName">Middle Name</Label>
//                 <Input
//                   id="middleName"
//                   name="middleName"
//                   value={formData.middleName}
//                   onChange={(e) => handleChange("middleName", e.target.value)}
//                   placeholder="Enter middle name"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="mobileNumber">Mobile Number</Label>
//                 <Input
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   type="tel"
//                   value={formData.mobileNumber}
//                   onChange={(e) => handleChange("mobileNumber", e.target.value)}
//                   placeholder="Enter mobile number"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="gender">Gender</Label>
//                 <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
//                   <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="male">Male</SelectItem>
//                     <SelectItem value="female">Female</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </>
//         );
//       // Step 2: Contact Information & Dates
//       case 2:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="maritalStatus">Marital Status</Label>
//                 <Select value={formData.maritalStatus} onValueChange={(value) => handleChange("maritalStatus", value)}>
//                   <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="single">Single</SelectItem>
//                     <SelectItem value="married">Married</SelectItem>
//                     <SelectItem value="divorced">Divorced</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="nationality">Nationality</Label>
//                 <Input
//                   id="nationality"
//                   name="nationality"
//                   value={formData.nationality}
//                   onChange={(e) => handleChange("nationality", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                 <Input
//                   id="dateOfBirth"
//                   name="dateOfBirth"
//                   type="date"
//                   value={formData.dateOfBirth}
//                   onChange={(e) => handleChange("dateOfBirth", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="memberCategory">Member Category</Label>
//                 <Input
//                   id="memberCategory"
//                   name="memberCategory"
//                   value={formData.memberCategory}
//                   onChange={(e) => handleChange("memberCategory", e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="christeningName">Christening Name</Label>
//               <Input
//                 id="christeningName"
//                 name="christeningName"
//                 value={formData.christeningName}
//                 onChange={(e) => handleChange("christeningName", e.target.value)}
//               />
//             </div> 
//           </>
//         );
//       // Step 3: Emergency & Spiritual Details
//       case 3:
//         return (
//           <>
//             <h2>Emergency Contact</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
//                 <Input
//                   id="emergencyContactName"
//                   name="emergencyContactName"
//                   value={formData.emergencyContactName}
//                   onChange={(e) => handleChange("emergencyContactName", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
//                 <Input
//                   id="emergencyContactPhone"
//                   name="emergencyContactPhone"
//                   type="tel"
//                   value={formData.emergencyContactPhone}
//                   onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="spiritualFatherName">Spiritual Father Name</Label>
//                 <Input
//                   id="spiritualFatherName"
//                   name="spiritualFatherName"
//                   value={formData.spiritualFatherName}
//                   onChange={(e) => handleChange("spiritualFatherName", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="fcmToken">FCM token</Label>
//                 <Input
//                   id="fcmToken"
//                   name="fcmToken"
//                   value={formData.fcmToken}
//                   onChange={(e) => handleChange("fcmToken", e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="emergencyContactRelation">Emergency Contact Relation</Label>
//               <Input
//                 id="emergencyContactRelation"
//                 name="emergencyContactRelation"
//                 value={formData.emergencyContactRelation}
//                 onChange={(e) => handleChange("emergencyContactRelation", e.target.value)}
//               />
//             </div>
//           </>
//         );
//       // Step 4: Address Details & Membership
//       case 4:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={(e) => handleChange("address", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="postcode">Post Code</Label>
//                 <Input
//                   id="postcode"
//                   name="postcode"
//                   value={formData.postcode}
//                   onChange={(e) => handleChange("postcode", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="membershipCommitmentConfirmed">
//                   Membership Commitment Confirmed
//                 </Label>
//                 <Select
//                   value={String(formData.membershipCommitmentConfirmed)}
//                   onValueChange={(value) => handleChange("membershipCommitmentConfirmed", value === "true")}
//                 >
//                   <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="true">true</SelectItem>
//                     <SelectItem value="false">false</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//                <div className="space-y-2">
//                 <Label htmlFor="consentContactChurch" >
//                   Consent Contact Church
//                 </Label>
//                 <Select
//                   value={String(formData.consentContactChurch)}
//                   onValueChange={(value) => handleChange("consentContactChurch", value === "true")}
//                 >
//                   <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="true">true</SelectItem>
//                     <SelectItem value="false">false</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
             
//               <div className="space-y-2">
//                 <Label htmlFor="consentDataUse" >
//                   Consent To Data Use
//                 </Label>
//                 <Select
//                   value={String(formData.consentDataUse)}
//                   onValueChange={(value) => handleChange("consentDataUse", value === "true")}
//                 >
//                   <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="true">true</SelectItem>
//                     <SelectItem value="false">false</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//           </>
//         );
//       // Step 5: Final Consent & Signatures
//       case 5:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="membershipApplicationDate">Membership Application Date</Label>
//                 <Input
//                   id="membershipApplicationDate"
//                   name="membershipApplicationDate"
//                   type="date"
//                   value={new Date(formData.membershipApplicationDate).toISOString().split('T')[0]}
//                   onChange={(e) => handleChange("membershipApplicationDate", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="applicationReceivedDate">Application Received Date</Label>
//                 <Input
//                   id="applicationReceivedDate"
//                   name="applicationReceivedDate"
//                   type="date"
//                   value={new Date(formData.applicationReceivedDate).toISOString().split('T')[0]}
//                   onChange={(e) => handleChange("applicationReceivedDate", e.target.value)}
//                 />
//               </div>
              
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="membershipApplicationSignature">Membership Application Signature</Label>
//               <Input
//                 id="membershipApplicationSignature"
//                 name="membershipApplicationSignature"
//                 value={formData.membershipApplicationSignature}
//                 onChange={(e) => handleChange("membershipApplicationSignature", e.target.value)}
//               />
//             </div>
//           </>
//         );
//       // Step 6: Final Dates
//       case 6:
//         return (
//           <>
//             <div className="grid grid-cols-2 gap-4">
              
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[525px]">
//         <DialogHeader>
//           <DialogTitle>
//             {member ? "Edit Member" : "Add New Member"}
//           </DialogTitle>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {renderFormContent()}
          
//           <DialogFooter>
//             {step > 1 && (
//               <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)}>
//                 Previous
//               </Button>
//             )}
//             {step < 6 ? (
//               <Button type="button" variant="default" onClick={handleSubmit}>
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit" variant="default">
//                 {member ? "Update Member" : "Add Member"}
//               </Button>
//             )}
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  profileImage: string;
  memberCategory: string;
  maritalStatus: string;
  gender: string;
  membershipType: string;
  christeningName: string;
  spiritualFatherName: string;
  fcmToken: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  postcode: string;
  mobileNumber: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  membershipCommitmentConfirmed: boolean;
  consentContactChurch: boolean;
  consentDataUse: boolean;
  membershipApplicationSignature: string;
  membershipApplicationDate: string;
  applicationReceivedDate: string;
}

interface MemberFormProps {
  member?: Member;
  open: boolean;
  onClose: () => void;
  onSubmit: (member: Member) => void;
}

export function MemberForm({ member, open, onClose, onSubmit }: MemberFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState<Member>({
    id: member?.id || "",
    email: member?.email || "",
    firstName: member?.firstName || "",
    lastName: member?.lastName || "",
    middleName: member?.middleName || "",
    profileImage: member?.profileImage || "",
    memberCategory: member?.memberCategory || "",
    maritalStatus: member?.maritalStatus || "",
    gender: member?.gender || "",
    membershipType: member?.membershipType || "",
    christeningName: member?.christeningName || "",
    spiritualFatherName: member?.spiritualFatherName || "",
    fcmToken: member?.fcmToken || "",
    dateOfBirth: member?.dateOfBirth || "",
    nationality: member?.nationality || "",
    address: member?.address || "",
    postcode: member?.postcode || "",
    mobileNumber: member?.mobileNumber || "",
    emergencyContactName: member?.emergencyContactName || "",
    emergencyContactRelation: member?.emergencyContactRelation || "",
    emergencyContactPhone: member?.emergencyContactPhone || "",
    membershipCommitmentConfirmed: member?.membershipCommitmentConfirmed || false,
    consentContactChurch: member?.consentContactChurch || false,
    consentDataUse: member?.consentDataUse || false,
    membershipApplicationSignature: member?.membershipApplicationSignature || "",
    membershipApplicationDate: member?.membershipApplicationDate || new Date().toISOString(),
    applicationReceivedDate: member?.applicationReceivedDate || new Date().toISOString(),
  });

  const handleChange = <T extends keyof Member>(field: T, value: Member[T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // New handler for the image file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Here we pass the base64 string to our handleChange function
        handleChange("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 6) {
      setStep(prev => prev + 1);
      return;
    }
    
    if (!formData.firstName || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Success",
      description: `Member ${member ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };
  
  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleChange("middleName", e.target.value)}
                  placeholder="Enter middle name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Added: Profile Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {/* Added: Image Preview */}
            {formData.profileImage && (
              <div className="mt-4">
                <img
                  src={formData.profileImage}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleChange("maritalStatus", value)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberCategory">Member Category</Label>
                <Input
                  id="memberCategory"
                  name="memberCategory"
                  value={formData.memberCategory}
                  onChange={(e) => handleChange("memberCategory", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="christeningName">Christening Name</Label>
              <Input
                id="christeningName"
                name="christeningName"
                value={formData.christeningName}
                onChange={(e) => handleChange("christeningName", e.target.value)}
              />
            </div> 
          </>
        );
      case 3:
        return (
          <>
            <h2>Emergency Contact</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleChange("emergencyContactName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spiritualFatherName">Spiritual Father Name</Label>
                <Input
                  id="spiritualFatherName"
                  name="spiritualFatherName"
                  value={formData.spiritualFatherName}
                  onChange={(e) => handleChange("spiritualFatherName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcmToken">FCM token</Label>
                <Input
                  id="fcmToken"
                  name="fcmToken"
                  value={formData.fcmToken}
                  onChange={(e) => handleChange("fcmToken", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Emergency Contact Relation</Label>
              <Input
                id="emergencyContactRelation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={(e) => handleChange("emergencyContactRelation", e.target.value)}
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Post Code</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={(e) => handleChange("postcode", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membershipCommitmentConfirmed">
                  Membership Commitment Confirmed
                </Label>
                <Select
                  value={String(formData.membershipCommitmentConfirmed)}
                  onValueChange={(value) => handleChange("membershipCommitmentConfirmed", value === "true")}
                >
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">true</SelectItem>
                    <SelectItem value="false">false</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consentContactChurch">Consent to Contact Church</Label>
                <Select
                  value={String(formData.consentContactChurch)}
                  onValueChange={(value) => handleChange("consentContactChurch", value === "true")}
                >
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">true</SelectItem>
                    <SelectItem value="false">false</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consentDataUse">Consent to Data Use</Label>
                <Select
                  value={String(formData.consentDataUse)}
                  onValueChange={(value) => handleChange("consentDataUse", value === "true")}
                >
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">true</SelectItem>
                    <SelectItem value="false">false</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipApplicationSignature">Membership Application Signature</Label>
              <Input
                id="membershipApplicationSignature"
                name="membershipApplicationSignature"
                value={formData.membershipApplicationSignature}
                onChange={(e) => handleChange("membershipApplicationSignature", e.target.value)}
              />
            </div>
          </>
        );
      case 6:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membershipApplicationDate">Membership Application Date</Label>
                <Input
                  id="membershipApplicationDate"
                  name="membershipApplicationDate"
                  type="date"
                  value={new Date(formData.membershipApplicationDate).toISOString().split('T')[0]}
                  onChange={(e) => handleChange("membershipApplicationDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicationReceivedDate">Application Received Date</Label>
                <Input
                  id="applicationReceivedDate"
                  name="applicationReceivedDate"
                  type="date"
                  value={new Date(formData.applicationReceivedDate).toISOString().split('T')[0]}
                  onChange={(e) => handleChange("applicationReceivedDate", e.target.value)}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Member" : "Add New Member"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormContent()}
          
          <DialogFooter>
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)}>
                Previous
              </Button>
            )}
            {step < 6 ? (
              <Button type="button" variant="default" onClick={handleSubmit}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="default">
                {member ? "Update Member" : "Add Member"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}