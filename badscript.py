from PIL import Image
import os

def get_all_filenames(directory):
    filenames = []
    directory = "./hand_photos/" + directory
    list_dir = os.listdir(directory)
    list_dir = [f.lower() for f in list_dir]
    list_dir = sorted(list_dir)
    for file in list_dir:
        filenames.append(file)
    
    return filenames

def get_pixel_arrays(directory, images, value):
    pixels = []
    pixels.append(value)
    for image in images:
        image = "./hand_photos/" + directory + "/" + image
        im = Image.open(image, 'r')
        im = im.resize((240,240),Image.ANTIALIAS)
        pix_val = list(im.getdata())
        pixels.append(pix_val)
    return pixels

left_files = get_all_filenames("left")
right_files = get_all_filenames("right")
middle_files = get_all_filenames("middle")
top_files = get_all_filenames("top")
bottom_files = get_all_filenames("bottom")
none_files = get_all_filenames("no_hand")

left_pixels = get_pixel_arrays("left", left_files, '0')
top_pixels = get_pixel_arrays("top", top_files, '1')
right_pixels = get_pixel_arrays("right", right_files, '2')
bottom_pixels = get_pixel_arrays("bottom", bottom_files, '3')
none_pixels = get_pixel_arrays("no_hand", none_files, '4')

