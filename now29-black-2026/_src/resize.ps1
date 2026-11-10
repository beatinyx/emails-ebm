param([string]$In,[string]$Out,[int]$Width,[int]$Quality=88)
Add-Type -AssemblyName System.Drawing
$src=[System.Drawing.Image]::FromFile($In)
$h=[int]([double]$src.Height*$Width/$src.Width)
$bmp=New-Object System.Drawing.Bitmap $Width,$h
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic';$g.SmoothingMode='HighQuality';$g.PixelOffsetMode='HighQuality';$g.CompositingQuality='HighQuality'
$g.DrawImage($src,0,0,$Width,$h)
if($Out -like '*.jpg'){
 $enc=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType -eq 'image/jpeg'}
 $p=New-Object System.Drawing.Imaging.EncoderParameters 1
 $p.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality),([long]$Quality)
 $bmp.Save($Out,$enc,$p)
}else{$bmp.Save($Out,[System.Drawing.Imaging.ImageFormat]::Png)}
$g.Dispose();$bmp.Dispose();$src.Dispose()
"$Out ${Width}x$h"
