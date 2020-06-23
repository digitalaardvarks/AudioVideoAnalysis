# Get started with AudioVideoAnalysis!

## Record  

AudioVideoAnalysis is designed for realtime spectral analysis of video and audio. by clicking **record**, you record said information onto the applications Display Window. Alternitivly, hit the `spacebar` to toggle recording on or off.

(GIF of button enabled with some processing)

## Device parameters

Before recording, make sure you have selected your desired device parameters. These include *camera device*, *camera format* (resolution), *audio device* and general *audio settings* such as sample-rate, buffersze etc.

(Image of device parameters)

## Audio parameters

AudioVideoAnalysis features three distinct section of audio parameters which effect the spectrogram printed in the Display window. These are *audio channels*, *color* and *processing*. 

(image of audio parameters with box and arrows)

The **logarithmic** dial controls the logarithmic frequency distribution curve of the spectrogram. A *higher* logarithmic value will create a steaper logarithmic curve along the Y-axis of the spectrogram. 

(GIF of logarithmic freq curve)

the **spectral blur** effect is, in principle, a vector-sized delay and can be used to create more generalized images of the audios amplitude and frequency content. The spectral blur has 3 modes: `no blur` - `blur` - `lots of blur`. 

(image of spectral blurring)

Additionally, the applications features **clickpoint data retrieval** of any audio information. This means you can simply point and click anywhere in the display window and get the Amplitude of a certian Frequency(Hz) at a given Time(sec).

(GIF of clickpoint retrieval)

**Note**: You can use the *clickpoint* feature as well as manipulate the spectrograms *color* and *logarithmic frequency distribution* post-recording!

## Video parameters

AudioVideoAnalysis also features three distinct section of video parameters which effect the motion/videogram printed in the Display window. These are *image selector*, *color* and *filter*. The video section also feature a preview window (or Source display), which lets you see how the video-feed is processed **before** being its printed in a "time domain". 

(image of video parameters)

The difference between a **Binary** and a "**Regular**"(unary) filter is that they are two different methods of reducing noise in your video-feed. The difference is subtile, but a rule of thumb is that the **binary** filters are usually more "radical" than its **Unary** counterparts. The applications source display, or preview window, can help us see this effect more clearly.

(GIF of different FILTERS on MotionGram)

**Note**: you can also manipulate the motion/videogram *color* post-recording.

## Display parameters

The application also features several unique display parameters that enables you to pre-configure and view your spectral recordings in various ways. In the applications UI, the **Display** sections features a *RefreshWindow* button (that clears all content from the display window), as well as a *rate* and *grid size* function.

(image of app display section)

The **Rate** feature lets you control how long it takes the spectral recordings to reach the end of the display window, or from x-min to x-max, effectivly controlling the printing rate of the recording. Thus, a *higher* rate value will result in a *shorter* display length. This `Total Display Time` is dynamically expressed in seconds in the Display section of the UI.  

(image of rate with ARROW OF TIME etc. with rate and the seconds in time)

There are more important display parameters in the **Menubar**.

(picture of menubar display options.)

*Bring Display to Front* will enable your display window to always be in front of the app UI. Underneath this option you find 4 different **Viewing options**. These options toggle different ways to view your spectral recording in the display window.

(GIF of the viewing options.)

Lastly, you can add **Analysis markers** to our display window by toggeling the *View Display Markers* and *View Display Grid* options. Futhermore, by configuring the *Grid Size* knob in the application UI, you can change the size of your analysis grid. Beware that a grid size of 6 corresponds to a visible 4x4 grid on our display window. This is because it requires 6 vertical and horizontal lines to generate a 4x4 grid.

(GIF of analysis markers in action.)

**Note**: You can resize the display window by simply clicking and dragging. Furthermore, you can change viewing options and add/remove analysis markers post-recording.

## Export your recordings

An important feature to the 2.0 version of AudioVideoAnalysis is the ability to export the images we create. It is importent to note here that **all the features that can be configured post-recording are in place such that we can find good representations of our recordings to export.**

(Image of image exporting)

## Report a problem

(image of report a problem)

Have you experienced errors or any strange behavior from AudioVideoAnalysis? If you take a moment and report it to us, you can greatly contribute to the development of this software. Clicking on _Help \> Report a problem\..._ opens your default internet browser and takes you straight to the Issues page at our Github repository for AudioVideoAnalysis. Here you can click on the (green) **New issue** button, and tell us about the problem.
