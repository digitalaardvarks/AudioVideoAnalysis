# Get started with AudioVideoAnalysis!

![app](/img/ava.jpg)

## Record Audio and Video

AudioVideoAnalysis is designed for realtime spectral analysis of video and audio. by clicking **record**, said images are printed onto the applications **display window**. Alternatively, hit the `spacebar` to toggle recording on or off.


![record](/img/1-record.gif)


## Device parameters

Before recording, make sure you have selected your desired device parameters. These include `camera device`, `camera format (resolution) and general audio settings` such as audio device, samplerate, buffersize, etc. The `refreshDevices` feature in the video section lets you refresh the video device list if you connect new video hardware to your computer while the application is running.   


![devices](/img/2-device-parameters.jpg)


## Audio parameters

AudioVideoAnalysis features three distinct sections of audio parameters that affect the spectrogram printed in the Display window. These are `audio channels`, `color` and `processing`. 


![audio](/img/3-audio-parameters.jpg)


The **logarithmic** dial controls how logarithmic we want our spectrogram frequency distribution to be. A *higher* logarithmic value will create a steeper logarithmic curve along the Y-axis of the spectrogram. 


![logfreq](/img/4-logfreq.gif)


the **spectral blur** effect is, in principle, a vector-sized delay and can be used to create more generalized images of the audio amplitude and frequency content. The spectral blur has 3 modes: `no blur` - `blur` - `lots of blur`. 


![spectral](/img/5-spectral-blur.jpg)


AudioVideoAnalysis also features **clickpoint data retrieval** of any recorded audio material. This means you can simply point and click anywhere in the display window and get the Amplitude of a certain Frequency(Hz) at a given Time(sec).


![clickpoint](/img/6-clickpoint.gif)


**Note**: You can use the clickpoint feature, as well as manipulate the spectrograms color and logarithmic frequency distribution, post-recording.

## Video parameters

AudioVideoAnalysis also features three distinct sections of video parameters that affect the motion/videogram printed in the Display window. These are `image selector`, `color` and `filter`. There is also a preview window that lets you see how the video-feed is processed **before** it's printed on the main display window.


![video](/img/7-video-parameters.jpg)


The **Image selector** lets you either view a videogram or motiongram in the display window. Both images express vertical motion over time, the only difference is that a motiongram has some additional pre-processing which further isolates motion and reduces image noise. 

When recording a motiongram, we can use a **binary** or "**regular**"(unary) noise reduction filter to reduce unwanted noise in our video-feed. The differences between these two filters are subtle, but a general tendency is that the **binary** filter is usually more "radical" than its **regular** counterpart. The preview window can help us see these effects more clearly.


![mg](/img/8-mg-filters.gif)


**Note**: you can also manipulate the motion/videogram color post-recording.

## Display parameters

The application also features several display parameters that enable you to pre-configure and view your spectral recordings in various ways. The **Display** sections feature a `RefreshWindow` button that clears all content from the display window, as well as a `rate` and `grid size` function.


![display](/img/9-display-parameters.jpg)


**Rate** controls how long it takes the spectral recordings to reach the end of the display window, or from x-min to x-max, effectively controlling the printing rate of the recording. Thus, a *higher* rate value will result in a *shorter* display length. This `Total Display Time` is dynamically expressed in seconds in the Display section of the UI.  


![rate](/img/10-rate.jpg)


There are also more display options in the **Menubar**.


![displaymenu](/img/11-menubar-display-options.jpg)


`Bring Display to Front` will enable your display window to always be in front of the app UI. Underneath this option, you find 4 different **viewing options**. These toggle different ways to view your spectral recording in the display window.


![viewoptions](/img/12-view-options.gif)


Lastly, you can add **Analysis markers** by toggling the `View Display Markers` and `View Display Grid` options. Furthermore, by configuring the `Grid Size` parameter in the app UI, you can change the size of your analysis grid. Beware that a grid size of 6 corresponds to a visible 4x4 grid. This is because it requires 6 vertical and horizontal lines to generate a 4x4 grid.


![analysismarkers](/img/13-analysis-markers.gif)


**Note**: You can resize the display window by simply clicking and dragging. Furthermore, you can change viewing options and add/remove analysis markers post-recording.

## Export your recordings

An important feature of the 2.0 version of AudioVideoAnalysis is the ability to export the images we create. It is important to note here that **the applications post-recording processing abilities are in place such that we can find good images to export for further analysis.**


![expop](/img/14-export-options.jpg)


## Report a problem

Have you experienced errors or any strange behavior from AudioVideoAnalysis? If you take a moment and report it to us, you can greatly contribute to the development of this software. Clicking on _Help \> Report a problem\..._ opens your default internet browser and takes you straight to the Issues page at our Github repository for AudioVideoAnalysis. Here you can click on the (green) **New issue** button, and tell us about the problem.


![report](/img/15-report-issue.jpg)