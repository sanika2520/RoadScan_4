
// import React, { useState } from "react";
// import { CenterFocusStrong as FocusIcon } from "@mui/icons-material";
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
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Tooltip,
//   Fade,
//   Snackbar
// } from "@mui/material";
// import {
//   CloudUpload,
//   Search as SearchIcon,
//   Dashboard as DashboardIcon,
//   Close as CloseIcon,
//   PlayCircleOutline,
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";
// import { keyframes } from "@mui/system";

// // Define a rotate animation
// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// // Theme Colors
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
//   borderRadius: '16px',
//   boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
// }));

// const SearchCard = styled(UploadCard)({});

// const NavButton = styled(Button)(({ active }) => ({
//   justifyContent: 'flex-start',
//   textTransform: 'none',
//   padding: '12px 24px',
//   marginBottom: '8px',
//   borderRadius: '8px',
//   backgroundColor: active ? primaryColor : 'transparent',
//   color: active ? '#fff' : 'rgba(255,255,255,0.8)',
//   fontWeight: active ? 700 : 400,
//   transition: 'all 0.3s',
//   '&:hover': {
//     backgroundColor: primaryColor,
//     transform: 'scale(1.02)'
//   },
//   '& .MuiButton-startIcon': {
//     color: active ? '#fff' : 'rgba(255,255,255,0.8)'
//   }
// }));

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("upload");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(null);
//   const [uploadError, setUploadError] = useState(null);
//   const [plateNumber, setPlateNumber] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchResults, setSearchResults] = useState(null);
//   const [searchError, setSearchError] = useState(null);
//   const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

//   const handleToastClose = () => {
//     setToast({ ...toast, open: false });
//   };

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
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percent);
//         },
//         timeout: 8000,
//       });

//       setUploadSuccess({
//         message: 'Video uploaded and processed successfully!',
//         filename: file.name
//       });
//       setToast({ open: true, message: "Upload Successful!", severity: "success" });

//     } catch (error) {
//       let errorMessage = 'No server response';
//       if (error.response) {
//         errorMessage = error.response.data?.detail || 'Server error';
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout - check backend';
//       }
//       setUploadError(errorMessage);
//       setToast({ open: true, message: "Upload Failed!", severity: "error" });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSearchClick = async () => {
//     setSearchResults(null);
//     setSearchError(null);

//     if (!plateNumber.trim()) {
//       setSearchError("Please enter a license plate number");
//       return;
//     }

//     setIsSearching(true);

//     try {
//       const response = await axios.get(`http://localhost:8000/search/${encodeURIComponent(plateNumber.trim())}`);
//       setSearchResults(response.data);
//       setToast({ open: true, message: "Search completed!", severity: "success" });

//     } catch (error) {
//       let errorMessage = "Search failed. Please try again.";
//       if (error.response) {
//         errorMessage = error.response.data?.detail || error.response.statusText;
//       } else if (error.request) {
//         errorMessage = "No response from server. Check your connection.";
//       }
//       setSearchError(errorMessage);
//       setToast({ open: true, message: "Search Failed!", severity: "error" });
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearchClick();
//     }
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "upload":
//         return (
//           <>
//             <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
//               Upload Video
//             </Typography>

//             <UploadCard>
//               <Box textAlign="center" mb={3}>
//                 <CloudUpload sx={{ fontSize: 60, color: highlightColor, mb: 2 }} />
//                 <Typography variant="h6" gutterBottom>Upload a video file</Typography>
//                 <Typography color="textSecondary">Supported formats: MP4, AVI, MOV</Typography>
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
//                   '&:hover': { backgroundColor: primaryColor }
//                 }}
//               >
//                 Choose File
//                 <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileUpload} />
//               </Button>

//               {isUploading && (
//                 <Box mt={3}>
//                   <Typography variant="body2" color="textSecondary" gutterBottom>
//                     Uploading... {uploadProgress}%
//                   </Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={uploadProgress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       backgroundColor: 'rgba(58,141,222,0.2)',
//                       '& .MuiLinearProgress-bar': { backgroundColor: highlightColor }
//                     }}
//                   />
//                 </Box>
//               )}

//               {uploadSuccess && (
//                 <Alert severity="success" sx={{ mt: 3, borderRadius: 2 }}>
//                   <strong>{uploadSuccess.message}</strong> — {uploadSuccess.filename}
//                 </Alert>
//               )}

//               {uploadError && (
//                 <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
//                   {uploadError}
//                 </Alert>
//               )}
//             </UploadCard>
//           </>
//         );

//       case "search":
//         return (
//           <>
//             <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
//               Search Plate
//             </Typography>

//             <SearchCard>
//               <Box textAlign="center" mb={3}>
//                 <SearchIcon sx={{ fontSize: 60, color: highlightColor, mb: 2 }} />
//                 <Typography variant="h6" gutterBottom>Find License Plate</Typography>
//                 <Typography color="textSecondary">Search processed videos by plate number</Typography>
//               </Box>

//               <Box display="flex" gap={2} mb={3}>
//                 <TextField
//                   fullWidth
//                   label="License Plate Number"
//                   variant="outlined"
//                   value={plateNumber}
//                   onChange={(e) => setPlateNumber(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   disabled={isSearching}
//                   error={!!searchError}
//                   helperText={searchError}
//                 />
//                 <Button
//                   variant="contained"
//                   size="large"
//                   startIcon={<SearchIcon />}
//                   onClick={handleSearchClick}
//                   disabled={isSearching || !plateNumber.trim()}
//                   sx={{
//                     py: 1.5,
//                     backgroundColor: highlightColor,
//                     '&:hover': { backgroundColor: primaryColor }
//                   }}
//                 >
//                   {isSearching ? "Searching..." : "Search"}
//                 </Button>
//               </Box>

//               {isSearching && (
//                 <Box display="flex" justifyContent="center" my={4}>
//                   <CircularProgress />
//                 </Box>
//               )}

//               {searchResults && (
//                 <Box mt={3}>
//                   <Typography variant="h6" mb={2}>
//                     Found {searchResults.count} results for: {searchResults.plate_number}
//                   </Typography>

//                   {searchResults.results.length > 0 ? (
//                     <TableContainer component={Paper}>
//                       <Table>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Video Name</TableCell>
//                             <TableCell>Timestamp</TableCell>
//                             <TableCell>View</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {searchResults.results.map((result, index) => (
//                             <TableRow key={index} hover>
//                               <TableCell>{result.video_name}</TableCell>
//                               <TableCell>{result.timestamp_display}</TableCell>
//                               <TableCell>
//                                 <Tooltip title="View Video" TransitionComponent={Fade}>
//                                   <IconButton
//                                     onClick={() => window.open(`http://localhost:8000/processed/${result.video_name}`)}
//                                   >
//                                     <PlayCircleOutline />
//                                   </IconButton>
//                                 </Tooltip>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   ) : (
//                     <Alert severity="info" sx={{ mt: 2 }}>No matching plates found.</Alert>
//                   )}
//                 </Box>
//               )}
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
//         flexDirection: 'column',
//         position: 'sticky',
//         top: 0,
//         height: '100vh'
//       }}>
//         {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//           <Avatar sx={{ bgcolor: highlightColor, mr: 2, width: 44, height: 44 }}>
//             <DashboardIcon />
//           </Avatar>
//           <Typography variant="h6" fontWeight={700}>RoadScan</Typography>
//         </Box> */}



// <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//   <Box sx={{ position: 'relative', width: 70, height: 70, mr: 2 }}>
//     {/* Rotating Border */}
//     <Box
//       sx={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         border: '3px solid rgba(58,141,222,0.5)',
//         borderRadius: '50%',
//         animation: `${rotate} 8s linear infinite`,
//       }}
//     />
//     {/* Avatar in center */}
//     <Avatar
//       sx={{
//         bgcolor: highlightColor,
//         width: 56,
//         height: 56,
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         boxShadow: '0 4px 12px rgba(58,141,222,0.5)',
//       }}
//     >
//       <FocusIcon sx={{ fontSize: 32 }} />
//     </Avatar>
//   </Box>

//   <Box>
//     <Typography 
//       variant="h6" 
//       fontWeight={700} 
//       sx={{ lineHeight: 1.2 }}
//     >
//       RoadScan
//     </Typography>
//     <Typography 
//       variant="caption" 
//       sx={{ color: 'rgba(255,255,255,0.7)' }}
//     >
//       ALPR System
//     </Typography>
//   </Box>
// </Box>

//         {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1 }}>
//   <Avatar
//     sx={{
//       bgcolor: highlightColor,
//       width: 56,
//       height: 56,
//       mr: 2,
//       boxShadow: '0 4px 12px rgba(58,141,222,0.5)',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'scale(1.08)',
//         boxShadow: '0 6px 16px rgba(58,141,222,0.6)'
//       }
//     }}
//   >
//     <FocusIcon sx={{ fontSize: 32 }} />
//   </Avatar>
//   <Box>
//     <Typography 
//       variant="h6" 
//       fontWeight={700} 
//       sx={{ lineHeight: 1.2 }}
//     >
//       RoadScan
//     </Typography>
//     <Typography 
//       variant="caption" 
//       sx={{ color: 'rgba(255,255,255,0.7)' }}
//     >
//       ALPR System
//     </Typography>
//   </Box>
// </Box> */}



//         <Box flex={1}>
//           <NavButton fullWidth startIcon={<CloudUpload />} onClick={() => setActiveSection("upload")} active={activeSection === "upload"}>
//             Upload Video
//           </NavButton>
//           <NavButton fullWidth startIcon={<SearchIcon />} onClick={() => setActiveSection("search")} active={activeSection === "search"}>
//             Search Plate
//           </NavButton>
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f5f7fa' }}>
//         <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//           {renderContent()}
//         </Box>
//       </Box>

//       {/* Toast Notifications */}
//       <Snackbar
//         open={toast.open}
//         autoHideDuration={3000}
//         onClose={handleToastClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Dashboard;




import React, { useState } from "react";
import { CenterFocusStrong as FocusIcon } from "@mui/icons-material";
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
  CircularProgress,
  Tooltip,
  Fade,
  Snackbar
} from "@mui/material";
import {
  CloudUpload,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  PlayCircleOutline,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

// Define animations
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Theme Colors
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
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
}));

const SearchCard = styled(UploadCard)({});

const NavButton = styled(Button)(({ active }) => ({
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: '14px 24px',
  marginBottom: '12px',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: active ? 700 : 500,
  backgroundColor: active ? highlightColor : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: highlightColor,
    transform: 'scale(1.03)'
  },
  '& .MuiButton-startIcon': {
    color: active ? '#fff' : 'rgba(255,255,255,0.8)'
  }
}));

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [plateNumber, setPlateNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleToastClose = () => setToast({ ...toast, open: false });

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

      await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
        timeout: 8000,
      });

      setUploadSuccess({
        message: 'Video uploaded and processed successfully!',
        filename: file.name
      });
      setToast({ open: true, message: "Upload Successful!", severity: "success" });

    } catch (error) {
      let message = 'No server response';
      if (error.response) message = error.response.data?.detail || 'Server error';
      else if (error.code === 'ECONNABORTED') message = 'Request timeout - check backend';

      setUploadError(message);
      setToast({ open: true, message: "Upload Failed!", severity: "error" });
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
      const response = await axios.get(`http://localhost:8000/search/${encodeURIComponent(plateNumber.trim())}`);
      setSearchResults(response.data);
      setToast({ open: true, message: "Search completed!", severity: "success" });

    } catch (error) {
      let message = "Search failed. Please try again.";
      if (error.response) message = error.response.data?.detail || error.response.statusText;
      else if (error.request) message = "No response from server. Check your connection.";

      setSearchError(message);
      setToast({ open: true, message: "Search Failed!", severity: "error" });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return (
          <>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Upload Video
            </Typography>
            <UploadCard>
              <Box textAlign="center" mb={3}>
                <CloudUpload sx={{ fontSize: 60, color: highlightColor, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Upload a video file</Typography>
                <Typography color="textSecondary">Supported formats: MP4, AVI, MOV</Typography>
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
                  fontWeight: 600,
                  fontSize: "1rem",
                  backgroundColor: highlightColor,
                  borderRadius: '12px',
                  '&:hover': { backgroundColor: primaryColor }
                }}
              >
                Choose File
                <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileUpload} />
              </Button>

              {isUploading && (
                <Box mt={3}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Uploading... {uploadProgress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(58,141,222,0.2)',
                      '& .MuiLinearProgress-bar': { backgroundColor: highlightColor }
                    }}
                  />
                </Box>
              )}

              {uploadSuccess && (
                <Alert severity="success" sx={{ mt: 3, borderRadius: 2 }}>
                  <strong>{uploadSuccess.message}</strong> — {uploadSuccess.filename}
                </Alert>
              )}
              {uploadError && (
                <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
                  {uploadError}
                </Alert>
              )}
            </UploadCard>
          </>
        );
      case "search":
        return (
          <>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Search Plate
            </Typography>
            <SearchCard>
              <Box textAlign="center" mb={3}>
                <SearchIcon sx={{ fontSize: 60, color: highlightColor, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Find License Plate</Typography>
                <Typography color="textSecondary">Search processed videos by plate number</Typography>
              </Box>

              <Box display="flex" gap={2} mb={3}>
                <TextField
                  fullWidth
                  label="License Plate Number"
                  variant="outlined"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
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
                    fontWeight: 600,
                    backgroundColor: highlightColor,
                    borderRadius: '12px',
                    '&:hover': { backgroundColor: primaryColor }
                  }}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </Box>

              {isSearching && (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress />
                </Box>
              )}

              {searchResults && (
                <Box mt={3}>
                  <Typography variant="h6" mb={2}>
                    Found {searchResults.count} results for: {searchResults.plate_number}
                  </Typography>

                  {searchResults.results.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Video Name</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchResults.results.map((result, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{result.video_name}</TableCell>
                              <TableCell>{result.timestamp_display}</TableCell>
                              <TableCell>
                                <Tooltip title="View Video" TransitionComponent={Fade}>
                                  <IconButton
                                    onClick={() => window.open(`http://localhost:8000/processed/${result.video_name}`)}
                                  >
                                    <PlayCircleOutline />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No matching plates found.
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
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        {/* Branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
          <Box sx={{ position: 'relative', width: 70, height: 70, mr: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '3px solid rgba(58,141,222,0.5)',
                borderRadius: '50%',
                animation: `${rotate} 8s linear infinite`,
              }}
            />
            <Avatar
              sx={{
                bgcolor: highlightColor,
                width: 56,
                height: 56,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 4px 12px rgba(58,141,222,0.5)',
              }}
            >
              <FocusIcon sx={{ fontSize: 32 }} />
            </Avatar>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>RoadScan</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>ALPR System</Typography>
          </Box>
        </Box>

        {/* Sidebar Menu */}
        <Box flex={1}>
          <NavButton fullWidth startIcon={<CloudUpload />} onClick={() => setActiveSection("upload")} active={activeSection === "upload"}>
            Upload Video
          </NavButton>
          <NavButton fullWidth startIcon={<SearchIcon />} onClick={() => setActiveSection("search")} active={activeSection === "search"}>
            Search Plate
          </NavButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 5, backgroundColor: '#f5f7fa' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
