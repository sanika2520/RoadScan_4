
// import React, { useState } from "react";
// import axios from 'axios';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Card,
//   LinearProgress,
//   useTheme
// } from "@mui/material";
// import { CloudUpload } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// // Styled Components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const Dashboard = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);

  
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     setUploadError(null);
//     setIsUploading(true);
//     setUploadProgress(0);
  
//     try {
//       const formData = new FormData();
//       formData.append('video', file);
  
//       const response = await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percent);
//         },
//         timeout: 5000, // Short timeout for testing
//       });
  
//       alert('Upload successful!');
//     } catch (error) {
//       let errorMessage = 'No server response';
//       if (error.response) {
//         errorMessage = error.response.data?.detail || 'Server error';
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout - check backend';
//       }
//       setUploadError(errorMessage);
//       console.error('Full error:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//         <Typography variant="h5" gutterBottom>
//           Upload Video
//         </Typography>
        
//         <Button
//           component="label"
//           variant="contained"
//           startIcon={<CloudUpload />}
//           disabled={isUploading}
//           sx={{ mt: 2 }}
//         >
//           Select File
//           <VisuallyHiddenInput 
//             type="file" 
//             accept="video/*"
//             onChange={handleFileUpload}
//           />
//         </Button>

//         {isUploading && (
//           <Box sx={{ mt: 2 }}>
//             <LinearProgress 
//               variant="determinate" 
//               value={uploadProgress} 
//               sx={{ height: 8 }}
//             />
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Uploading... {uploadProgress}%
//             </Typography>
//           </Box>
//         )}

//         {uploadError && (
//           <Box sx={{ 
//             mt: 2,
//             p: 2,
//             backgroundColor: '#ffebee',
//             borderRadius: 1,
//             color: 'error.main'
//           }}>
//             <Typography variant="body2">
//               Error: {uploadError}
//             </Typography>
//           </Box>
//         )}
//       </Card>
//     </Box>
//   );
// };

// export default Dashboard;



// import React, { useState } from "react";
// import axios from 'axios';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Card,
//   LinearProgress,
//   Avatar,
//   useTheme
// } from "@mui/material";
// import { 
//   CloudUpload,
//   Dashboard as DashboardIcon
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// // Custom theme colors
// const sidebarBg = '#1a2b4a';
// const highlightColor = '#3a8dde';

// // Styled Components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const UploadCard = styled(Card)(({ theme }) => ({
//   maxWidth: 600,
//   margin: '0 auto',
//   padding: theme.spacing(4),
//   borderRadius: '12px',
//   boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//   border: '1px solid rgba(0,0,0,0.05)'
// }));

// const Dashboard = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     setUploadError(null);
//     setIsUploading(true);
//     setUploadProgress(0);
  
//     try {
//       const formData = new FormData();
//       formData.append('video', file);
  
//       const response = await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percent);
//         },
//         timeout: 5000, // Short timeout for testing
//       });
  
//       alert('Upload successful!');
//     } catch (error) {
//       let errorMessage = 'No server response';
//       if (error.response) {
//         errorMessage = error.response.data?.detail || 'Server error';
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout - check backend';
//       }
//       setUploadError(errorMessage);
//       console.error('Full error:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ 
//         width: 280,
//         backgroundColor: sidebarBg,
//         color: 'white',
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//           <Avatar sx={{ 
//             bgcolor: highlightColor, 
//             mr: 2,
//             width: 40,
//             height: 40
//           }}>
//             <DashboardIcon />
//           </Avatar>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>RoadScan</Typography>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ 
//         flex: 1,
//         padding: 4,
//         backgroundColor: '#f5f7fa'
//       }}>
//         <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//           <Typography variant="h5" gutterBottom sx={{ 
//             fontWeight: 600,
//             color: sidebarBg,
//             mb: 3
//           }}>
//             Upload Video for Processing
//           </Typography>
          
//           <UploadCard>
//             <Box sx={{ textAlign: 'center', mb: 3 }}>
//               <CloudUpload sx={{ 
//                 fontSize: 60, 
//                 color: highlightColor, 
//                 mb: 2 
//               }} />
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
//                 Select a video file
//               </Typography>
//               <Typography color="textSecondary">
//                 The system will automatically detect license plates in your video
//               </Typography>
//             </Box>
            
//             <Button
//               component="label"
//               variant="contained"
//               fullWidth
//               size="large"
//               startIcon={<CloudUpload />}
//               disabled={isUploading}
//               sx={{ 
//                 py: 1.5,
//                 backgroundColor: highlightColor,
//                 '&:hover': {
//                   backgroundColor: '#2a4b7c'
//                 }
//               }}
//             >
//               Choose File
//               <VisuallyHiddenInput 
//                 type="file" 
//                 accept="video/*" 
//                 onChange={handleFileUpload} 
//               />
//             </Button>
            
//             {isUploading && (
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                   Uploading... {uploadProgress}%
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={uploadProgress} 
//                   sx={{ 
//                     height: 8, 
//                     borderRadius: 4,
//                     backgroundColor: 'rgba(58, 141, 222, 0.2)',
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: highlightColor
//                     }
//                   }}
//                 />
//               </Box>
//             )}

//             {uploadError && (
//               <Box sx={{ 
//                 mt: 2,
//                 p: 2,
//                 backgroundColor: '#ffebee',
//                 borderRadius: 1,
//                 color: 'error.main'
//               }}>
//                 <Typography variant="body2">
//                   Error: {uploadError}
//                 </Typography>
//               </Box>
//             )}
//           </UploadCard>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;




// import React, { useState } from "react";
// import axios from 'axios';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Card,
//   LinearProgress,
//   Avatar,
//   Alert,
//   Collapse,
//   IconButton
// } from "@mui/material";
// import { 
//   CloudUpload,
//   Dashboard as DashboardIcon,
//   Close as CloseIcon
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// // Custom theme colors
// const sidebarBg = '#1a2b4a';
// const highlightColor = '#3a8dde';

// // Styled Components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const UploadCard = styled(Card)(({ theme }) => ({
//   maxWidth: 600,
//   margin: '0 auto',
//   padding: theme.spacing(4),
//   borderRadius: '12px',
//   boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//   border: '1px solid rgba(0,0,0,0.05)'
// }));

// const Dashboard = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(null);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     setUploadError(null);
//     setUploadSuccess(null);
//     setIsUploading(true);
//     setUploadProgress(0);
  
//     try {
//       const formData = new FormData();
//       formData.append('video', file);
  
//       const response = await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percent);
//         },
//         timeout: 5000,
//       });
  
//       setUploadSuccess({
//         message: 'Video uploaded and processed successfully!',
//         filename: file.name
//       });
//     } catch (error) {
//       let errorMessage = 'No server response';
//       if (error.response) {
//         errorMessage = error.response.data?.detail || 'Server error';
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout - check backend';
//       }
//       setUploadError(errorMessage);
//       console.error('Upload error:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ 
//         width: 280,
//         backgroundColor: sidebarBg,
//         color: 'white',
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//           <Avatar sx={{ 
//             bgcolor: highlightColor, 
//             mr: 2,
//             width: 40,
//             height: 40
//           }}>
//             <DashboardIcon />
//           </Avatar>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>RoadScan</Typography>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ 
//         flex: 1,
//         padding: 4,
//         backgroundColor: '#f5f7fa'
//       }}>
//         <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//           <Typography variant="h5" gutterBottom sx={{ 
//             fontWeight: 600,
//             color: sidebarBg,
//             mb: 3
//           }}>
//             Upload Video for Processing
//           </Typography>
          
//           {/* Success Alert - Now positioned more prominently */}
//           {uploadSuccess && (
//             <Alert
//               severity="success"
//               action={
//                 <IconButton
//                   aria-label="close"
//                   color="inherit"
//                   size="small"
//                   onClick={() => setUploadSuccess(null)}
//                 >
//                   <CloseIcon fontSize="inherit" />
//                 </IconButton>
//               }
//               sx={{ 
//                 mb: 3,
//                 borderRadius: 2,
//                 boxShadow: 1
//               }}
//             >
//               <Box>
//                 <Typography fontWeight="bold">{uploadSuccess.message}</Typography>
//                 <Typography variant="body2">File: {uploadSuccess.filename}</Typography>
//               </Box>
//             </Alert>
//           )}

//           <UploadCard>
//             <Box sx={{ textAlign: 'center', mb: 3 }}>
//               <CloudUpload sx={{ 
//                 fontSize: 60, 
//                 color: highlightColor, 
//                 mb: 2 
//               }} />
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
//                 Select a video file
//               </Typography>
//               <Typography color="textSecondary">
//                 The system will automatically detect license plates in your video
//               </Typography>
//             </Box>
            
//             <Button
//               component="label"
//               variant="contained"
//               fullWidth
//               size="large"
//               startIcon={<CloudUpload />}
//               disabled={isUploading}
//               sx={{ 
//                 py: 1.5,
//                 backgroundColor: highlightColor,
//                 '&:hover': {
//                   backgroundColor: '#2a4b7c'
//                 }
//               }}
//             >
//               Choose File
//               <VisuallyHiddenInput 
//                 type="file" 
//                 accept="video/*" 
//                 onChange={handleFileUpload} 
//               />
//             </Button>
            
//             {isUploading && (
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                   Uploading... {uploadProgress}%
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={uploadProgress} 
//                   sx={{ 
//                     height: 8, 
//                     borderRadius: 4,
//                     backgroundColor: 'rgba(58, 141, 222, 0.2)',
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: highlightColor
//                     }
//                   }}
//                 />
//               </Box>
//             )}

//             {uploadError && (
//               <Alert
//                 severity="error"
//                 sx={{ 
//                   mt: 2,
//                   borderRadius: 2
//                 }}
//                 onClose={() => setUploadError(null)}
//               >
//                 {uploadError}
//               </Alert>
//             )}
//           </UploadCard>
//         </Box>
//       </Box>
//     </Box>
//   );
// };


// export default Dashboard;



// import React, { useState } from "react";
// import axios from 'axios';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Card,
//   LinearProgress,
//   Avatar,
//   Alert,
//   IconButton,
//   TextField
// } from "@mui/material";
// import { 
//   CloudUpload,
//   Search as SearchIcon,
//   Dashboard as DashboardIcon,
//   Close as CloseIcon
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// // Custom theme colors
// const sidebarBg = '#1a2b4a';
// const highlightColor = '#3a8dde';
// const primaryColor = '#2a4b7c';

// // Styled Components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const UploadCard = styled(Card)(({ theme }) => ({
//   maxWidth: 600,
//   margin: '0 auto',
//   padding: theme.spacing(4),
//   borderRadius: '12px',
//   boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//   border: '1px solid rgba(0,0,0,0.05)'
// }));

// const SearchCard = styled(Card)(({ theme }) => ({
//   maxWidth: 600,
//   margin: '0 auto',
//   padding: theme.spacing(4),
//   borderRadius: '12px',
//   boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//   border: '1px solid rgba(0,0,0,0.05)'
// }));

// const NavButton = styled(Button)(({ active }) => ({
//   justifyContent: 'flex-start',
//   textTransform: 'none',
//   padding: '12px 24px',
//   marginBottom: '8px',
//   borderRadius: '8px',
//   backgroundColor: active ? primaryColor : 'transparent',
//   color: active ? '#fff' : 'rgba(255,255,255,0.8)',
//   fontWeight: active ? 600 : 400,
//   '&:hover': {
//     backgroundColor: primaryColor,
//     color: '#fff'
//   },
//   '& .MuiButton-startIcon': {
//     color: active ? '#fff' : 'rgba(255,255,255,0.8)'
//   }
// }));

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("upload");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(null);
//   const [plateNumber, setPlateNumber] = useState("");

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     setUploadError(null);
//     setUploadSuccess(null);
//     setIsUploading(true);
//     setUploadProgress(0);
  
//     try {
//       const formData = new FormData();
//       formData.append('video', file);
  
//       const response = await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percent);
//         },
//         timeout: 5000,
//       });
  
//       setUploadSuccess({
//         message: 'Video uploaded and processed successfully!',
//         filename: file.name
//       });
//     } catch (error) {
//       let errorMessage = 'No server response';
//       if (error.response) {
//         errorMessage = error.response.data?.detail || 'Server error';
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout - check backend';
//       }
//       setUploadError(errorMessage);
//       console.error('Upload error:', error);
//     } finally {
//       setIsUploading(false);
//     }
//   };




// const [isSearching, setIsSearching] = useState(false);
// const [searchResults, setSearchResults] = useState(null);
// const [searchError, setSearchError] = useState(null);

// const handleSearchClick = async () => {
//   // Clear previous results and errors
//   setSearchResults(null);
//   setSearchError(null);
  
//   // Validate input
//   if (!plateNumber.trim()) {
//     setSearchError("Please enter a license plate number");
//     return;
//   }

//   setIsSearching(true);
  
//   try {
//     console.log("Searching for plate:", plateNumber);
    
//     const response = await axios.get(
//       `http://localhost:8000/search/${encodeURIComponent(plateNumber.trim())}`
//     );
    
//     console.log("Search results:", response.data);
//     setSearchResults(response.data);
    
//   } catch (error) {
//     console.error("Search failed:", error);
    
//     let errorMessage = "Search failed. Please try again.";
//     if (error.response) {
//       // Handle HTTP errors (4xx, 5xx)
//       errorMessage = error.response.data?.detail || error.response.statusText;
//     } else if (error.request) {
//       // The request was made but no response was received
//       errorMessage = "No response from server. Check your connection.";
//     }
    
//     setSearchError(errorMessage);
//     setSearchResults(null);
    
//   } finally {
//     setIsSearching(false);
//   }
// };



//   const renderContent = () => {
//     switch (activeSection) {
//       case "upload":
//         return (
//           <>
//             <Typography variant="h5" gutterBottom sx={{ 
//               fontWeight: 600,
//               color: sidebarBg,
//               mb: 3
//             }}>
//               Upload Video for Processing
//             </Typography>
            
//             {uploadSuccess && (
//               <Alert
//                 severity="success"
//                 action={
//                   <IconButton
//                     aria-label="close"
//                     color="inherit"
//                     size="small"
//                     onClick={() => setUploadSuccess(null)}
//                   >
//                     <CloseIcon fontSize="inherit" />
//                   </IconButton>
//                 }
//                 sx={{ 
//                   mb: 3,
//                   borderRadius: 2,
//                   boxShadow: 1
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{uploadSuccess.message}</Typography>
//                   <Typography variant="body2">File: {uploadSuccess.filename}</Typography>
//                 </Box>
//               </Alert>
//             )}

//             <UploadCard>
//               <Box sx={{ textAlign: 'center', mb: 3 }}>
//                 <CloudUpload sx={{ 
//                   fontSize: 60, 
//                   color: highlightColor, 
//                   mb: 2 
//                 }} />
//                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
//                   Select a video file
//                 </Typography>
//                 <Typography color="textSecondary">
//                   The system will automatically detect license plates in your video
//                 </Typography>
//               </Box>
              
//               <Button
//                 component="label"
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 startIcon={<CloudUpload />}
//                 disabled={isUploading}
//                 sx={{ 
//                   py: 1.5,
//                   backgroundColor: highlightColor,
//                   '&:hover': {
//                     backgroundColor: primaryColor
//                   }
//                 }}
//               >
//                 Choose File
//                 <VisuallyHiddenInput 
//                   type="file" 
//                   accept="video/*" 
//                   onChange={handleFileUpload} 
//                 />
//               </Button>
              
//               {isUploading && (
//                 <Box sx={{ mt: 3 }}>
//                   <Typography variant="body2" color="textSecondary" gutterBottom>
//                     Uploading... {uploadProgress}%
//                   </Typography>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={uploadProgress} 
//                     sx={{ 
//                       height: 8, 
//                       borderRadius: 4,
//                       backgroundColor: 'rgba(58, 141, 222, 0.2)',
//                       '& .MuiLinearProgress-bar': {
//                         backgroundColor: highlightColor
//                       }
//                     }}
//                   />
//                 </Box>
//               )}

//               {uploadError && (
//                 <Alert
//                   severity="error"
//                   sx={{ 
//                     mt: 2,
//                     borderRadius: 2
//                   }}
//                   onClose={() => setUploadError(null)}
//                 >
//                   {uploadError}
//                 </Alert>
//               )}
//             </UploadCard>
//           </>
//         );
//       case "search":
//         return (
//           <>
//             <Typography variant="h5" gutterBottom sx={{ 
//               fontWeight: 600,
//               color: sidebarBg,
//               mb: 3
//             }}>
//               Search License Plate
//             </Typography>
            
//             <SearchCard>
//               <Box sx={{ textAlign: 'center', mb: 3 }}>
//                 <SearchIcon sx={{ 
//                   fontSize: 60, 
//                   color: highlightColor, 
//                   mb: 2 
//                 }} />
//                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
//                   Enter License Plate Number
//                 </Typography>
//                 <Typography color="textSecondary">
//                   Search for a specific license plate in processed videos
//                 </Typography>
//               </Box>
              
//               <TextField
//                 fullWidth
//                 label="License Plate Number"
//                 variant="outlined"
//                 value={plateNumber}
//                 onChange={(e) => setPlateNumber(e.target.value)}
//                 sx={{ mb: 3 }}
//               />
              
//               <Button
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 startIcon={<SearchIcon />}
//                 onClick={handleSearchClick}
//                 sx={{ 
//                   py: 1.5,
//                   backgroundColor: highlightColor,
//                   '&:hover': {
//                     backgroundColor: primaryColor
//                   }
//                 }}
//               >
//                 Search Plate
//               </Button>
//             </SearchCard>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ 
//         width: 280,
//         backgroundColor: sidebarBg,
//         color: 'white',
//         padding: 2,
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//           <Avatar sx={{ 
//             bgcolor: highlightColor, 
//             mr: 2,
//             width: 40,
//             height: 40
//           }}>
//             <DashboardIcon />
//           </Avatar>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>RoadScan</Typography>
//         </Box>

//         <Box sx={{ flex: 1 }}>
//           <NavButton
//             fullWidth
//             startIcon={<CloudUpload />}
//             onClick={() => setActiveSection("upload")}
//             active={activeSection === "upload"}
//           >
//             Upload Video
//           </NavButton>
          
//           <NavButton
//             fullWidth
//             startIcon={<SearchIcon />}
//             onClick={() => setActiveSection("search")}
//             active={activeSection === "search"}
//           >
//             Search Plate
//           </NavButton>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ 
//         flex: 1,
//         padding: 4,
//         backgroundColor: '#f5f7fa'
//       }}>
//         <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//           {renderContent()}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;



import React, { useState } from "react";
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Button, 
  Card,
  LinearProgress,
  Avatar,
  Alert,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import { 
  CloudUpload,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  PlayCircleOutline
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Custom theme colors
const sidebarBg = '#1a2b4a';
const highlightColor = '#3a8dde';
const primaryColor = '#2a4b7c';

// Styled Components
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0,0,0,0.05)'
}));

const SearchCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0,0,0,0.05)'
}));

const NavButton = styled(Button)(({ active }) => ({
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: '12px 24px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor: active ? primaryColor : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  fontWeight: active ? 600 : 400,
  '&:hover': {
    backgroundColor: primaryColor,
    color: '#fff'
  },
  '& .MuiButton-startIcon': {
    color: active ? '#fff' : 'rgba(255,255,255,0.8)'
  }
}));

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [plateNumber, setPlateNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      const formData = new FormData();
      formData.append('video', file);
  
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
        timeout: 5000,
      });
  
      setUploadSuccess({
        message: 'Video uploaded and processed successfully!',
        filename: file.name
      });
    } catch (error) {
      let errorMessage = 'No server response';
      if (error.response) {
        errorMessage = error.response.data?.detail || 'Server error';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - check backend';
      }
      setUploadError(errorMessage);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSearchClick = async () => {
    setSearchResults(null);
    setSearchError(null);
    
    if (!plateNumber.trim()) {
      setSearchError("Please enter a license plate number");
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await axios.get(
        `http://localhost:8000/search/${encodeURIComponent(plateNumber.trim())}`
      );
      setSearchResults(response.data);
    } catch (error) {
      let errorMessage = "Search failed. Please try again.";
      if (error.response) {
        errorMessage = error.response.data?.detail || error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      setSearchError(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 600,
              color: sidebarBg,
              mb: 3
            }}>
              Upload Video for Processing
            </Typography>
            
            {uploadSuccess && (
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setUploadSuccess(null)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: 1
                }}
              >
                <Box>
                  <Typography fontWeight="bold">{uploadSuccess.message}</Typography>
                  <Typography variant="body2">File: {uploadSuccess.filename}</Typography>
                </Box>
              </Alert>
            )}

            <UploadCard>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <CloudUpload sx={{ 
                  fontSize: 60, 
                  color: highlightColor, 
                  mb: 2 
                }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Select a video file
                </Typography>
                <Typography color="textSecondary">
                  The system will automatically detect license plates in your video
                </Typography>
              </Box>
              
              <Button
                component="label"
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CloudUpload />}
                disabled={isUploading}
                sx={{ 
                  py: 1.5,
                  backgroundColor: highlightColor,
                  '&:hover': {
                    backgroundColor: primaryColor
                  }
                }}
              >
                Choose File
                <VisuallyHiddenInput 
                  type="file" 
                  accept="video/*" 
                  onChange={handleFileUpload} 
                />
              </Button>
              
              {isUploading && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Uploading... {uploadProgress}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: 'rgba(58, 141, 222, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: highlightColor
                      }
                    }}
                  />
                </Box>
              )}

              {uploadError && (
                <Alert
                  severity="error"
                  sx={{ 
                    mt: 2,
                    borderRadius: 2
                  }}
                  onClose={() => setUploadError(null)}
                >
                  {uploadError}
                </Alert>
              )}
            </UploadCard>
          </>
        );
      case "search":
        return (
          <>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 600,
              color: sidebarBg,
              mb: 3
            }}>
              Search License Plate
            </Typography>
            
            <SearchCard>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <SearchIcon sx={{ 
                  fontSize: 60, 
                  color: highlightColor, 
                  mb: 2 
                }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Enter License Plate Number
                </Typography>
                <Typography color="textSecondary">
                  Search for a specific license plate in processed videos
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  label="License Plate Number"
                  variant="outlined"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  disabled={isSearching}
                  error={!!searchError}
                  helperText={searchError}
                />
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={handleSearchClick}
                  disabled={isSearching || !plateNumber.trim()}
                  sx={{ 
                    py: 1.5,
                    backgroundColor: highlightColor,
                    '&:hover': {
                      backgroundColor: primaryColor
                    }
                  }}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </Box>

              {isSearching && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {searchResults && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Found {searchResults.count} results for: {searchResults.plate_number}
                  </Typography>
                  
                  {searchResults.results.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Video</TableCell>
                            <TableCell>Timestamp</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchResults.results.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell>{result.video_name}</TableCell>
                              <TableCell>{result.timestamp_display}</TableCell>
                              {/* <TableCell>
                                <Button 
                                  startIcon={<PlayCircleOutline />}
                                  onClick={() => window.open(`http://localhost:8000/processed/${result.video_name}`)}
                                >
                                  View
                                </Button>
                              </TableCell> */}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No matching plates found
                    </Alert>
                  )}
                </Box>
              )}
            </SearchCard>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: 280,
        backgroundColor: sidebarBg,
        color: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
          <Avatar sx={{ 
            bgcolor: highlightColor, 
            mr: 2,
            width: 40,
            height: 40
          }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>RoadScan</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <NavButton
            fullWidth
            startIcon={<CloudUpload />}
            onClick={() => setActiveSection("upload")}
            active={activeSection === "upload"}
          >
            Upload Video
          </NavButton>
          
          <NavButton
            fullWidth
            startIcon={<SearchIcon />}
            onClick={() => setActiveSection("search")}
            active={activeSection === "search"}
          >
            Search Plate
          </NavButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        padding: 4,
        backgroundColor: '#f5f7fa'
      }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;