import sys
import json
import math
from PIL import Image, ImageDraw, ImageOps

WIDTH=400
HEIGHT=400
SKI_LENGTH=40.0/100.0
STEPS=10
SKI_COLOR='blue'

def draw_line(coords, length, bearing, fill="black", width=1):
    angle = math.radians(bearing)
    dy = length * math.cos(angle)
    dx = length * math.sin(angle)
    end = (coords[0] + dx, coords[1] + dy)
    if width > 0:
        draw.line([coords, end], fill=fill, width=int(width))
    return end

def create_gradient(fixed_points, f0=1, f1=1):
    gradient = []
    for point in fixed_points:
        if len(gradient) == 0:
            gradient.append((point[1], point[2]))
            i = 0
        else:
            dr = (point[1] - gradient[i][0]) / (point[0] - i)
            dl = (point[2] - gradient[i][1]) / (point[0] - i)
            while i < point[0]:
                gradient.append((gradient[i][0] + dr, gradient[i][1] + dl))
                i += 1
    while i <= 100:
        gradient.append((gradient[i][0], gradient[i][1]))
        i += 1
    for i in range(len(gradient)):
        gradient[i] = (f0 * gradient[i][0],  f1 * gradient[i][1])
    return gradient

def draw_curves(coord):
    rcoord = (coord[0]-CONFIG['stance'], coord[1])
    lcoord = (coord[0]+CONFIG['stance'], coord[1])

    total_distance = CONFIG['fallline'] + CONFIG['traverse'] + 2*2*math.pi*CONFIG['radius']*(CONFIG['angle']/360.0)
    center_distance = 0.0
    step_distance = 0.0

    # Apex
    distance = 1
    for i in range(int(CONFIG['fallline']/2)):
        index = int(100*center_distance/total_distance)
        if step_distance > STEPS:
            step_distance = 0.0
            if abs(RPIVOT[index][1]) > 1:
                draw_line(rcoord, RPIVOT[index][0], RPIVOT[index][1], fill=SKI_COLOR)
                draw_line(rcoord, RPIVOT[index][0], RPIVOT[index][1]-180, fill=SKI_COLOR)
            if abs(LPIVOT[index][1]) > 1:
                draw_line(lcoord, LPIVOT[index][0], LPIVOT[index][1], fill=SKI_COLOR)
                draw_line(lcoord, LPIVOT[index][0], LPIVOT[index][1]-180, fill=SKI_COLOR)
        rcoord = draw_line(rcoord, distance, 0, width=GRADIENT[index][0])
        lcoord = draw_line(lcoord, distance, 0, width=GRADIENT[index][1])
        center_distance += distance
        step_distance += distance
    # Right Footer Bottom
    rdistance = (2*math.pi*(CONFIG['radius']+CONFIG['stance']))/360
    ldistance = (2*math.pi*(CONFIG['radius']-CONFIG['stance']))/360
    distance = 2*math.pi*(CONFIG['radius'])/360
    for i in range(CONFIG['angle']):
        index = int(100*center_distance/total_distance)
        if step_distance > STEPS:
            step_distance = 0.0
            if abs(RPIVOT[index][1]) > 1:
                draw_line(rcoord, RPIVOT[index][0], i+RPIVOT[index][1], fill=SKI_COLOR)
                draw_line(rcoord, RPIVOT[index][0], i+RPIVOT[index][1]-180, fill=SKI_COLOR)
            if abs(LPIVOT[index][1]) > 1:
                draw_line(lcoord, LPIVOT[index][0], i+LPIVOT[index][1], fill=SKI_COLOR)
                draw_line(lcoord, LPIVOT[index][0], i+LPIVOT[index][1]-180, fill=SKI_COLOR)
        rcoord = draw_line(rcoord, rdistance, i, width=GRADIENT[index][0])
        lcoord = draw_line(lcoord, ldistance, i, width=GRADIENT[index][1])
        center_distance += distance
        step_distance += distance
    # Traverse
    distance = 1
    for i in range(CONFIG['traverse']):
        index = int(100*center_distance/total_distance)
        if step_distance > STEPS:
            step_distance = 0.0
            if abs(RPIVOT[index][1]) > 1:
                draw_line(rcoord, RPIVOT[index][0], CONFIG['angle']+RPIVOT[index][1], fill=SKI_COLOR)
                draw_line(rcoord, RPIVOT[index][0], CONFIG['angle']+RPIVOT[index][1]-180, fill=SKI_COLOR)
            if abs(LPIVOT[index][1]) > 1:
                draw_line(lcoord, LPIVOT[index][0], CONFIG['angle']+LPIVOT[index][1], fill=SKI_COLOR)
                draw_line(lcoord, LPIVOT[index][0], CONFIG['angle']+LPIVOT[index][1]-180, fill=SKI_COLOR)
        rcoord = draw_line(rcoord, distance, CONFIG['angle'], width=GRADIENT[index][0])
        lcoord = draw_line(lcoord, distance, CONFIG['angle'], width=GRADIENT[index][1])
        center_distance += distance
        step_distance += distance
    # Left Footer Top
    ldistance = (2*math.pi*(CONFIG['radius']+CONFIG['stance']))/360
    rdistance = (2*math.pi*(CONFIG['radius']-CONFIG['stance']))/360
    distance = 2*math.pi*(CONFIG['radius'])/360
    for i in range(CONFIG['angle'], 0, -1):
        index = int(100*center_distance/total_distance)
        if step_distance > STEPS:
            step_distance = 0.0
            if abs(RPIVOT[index][1]) > 1:
                draw_line(rcoord, RPIVOT[index][0], i+RPIVOT[index][1], fill=SKI_COLOR)
                draw_line(rcoord, RPIVOT[index][0], i+RPIVOT[index][1]-180, fill=SKI_COLOR)
            if abs(LPIVOT[index][1]) > 1:
                draw_line(lcoord, LPIVOT[index][0], i+LPIVOT[index][1], fill=SKI_COLOR)
                draw_line(lcoord, LPIVOT[index][0], i+LPIVOT[index][1]-180, fill=SKI_COLOR)
        rcoord = draw_line(rcoord, rdistance, i, width=GRADIENT[index][0])
        lcoord = draw_line(lcoord, ldistance, i, width=GRADIENT[index][1])
        center_distance += distance
        step_distance += distance
    # Apex
    distance = 1 
    for i in range(int(CONFIG['fallline']/2)):
        if step_distance > STEPS:
            step_distance = 0.0
            if abs(RPIVOT[index][1]) > 1:
                draw_line(rcoord, RPIVOT[index][0], RPIVOT[index][1], fill=SKI_COLOR)
                draw_line(rcoord, RPIVOT[index][0], RPIVOT[index][1]-180, fill=SKI_COLOR)
            if abs(LPIVOT[index][1]) > 1:
                draw_line(lcoord, LPIVOT[index][0], LPIVOT[index][1], fill=SKI_COLOR)
                draw_line(lcoord, LPIVOT[index][0], LPIVOT[index][1]-180, fill=SKI_COLOR)
        rcoord = draw_line(rcoord, distance, 0, width=GRADIENT[index][0])
        lcoord = draw_line(lcoord, distance, 0, width=GRADIENT[index][1])
        center_distance += distance
        step_distance += distance

if __name__ == "__main__":
    name = sys.argv[1]
    with open(name+".json") as infile:
        CONFIG = json.loads(infile.read())

    # Calculate the Pressure Gradient map
    GRADIENT = create_gradient(CONFIG['gradient'], CONFIG['pressure']/100.0, CONFIG['pressure']/100.0)

    # Calculate the Skid Gradient map
    RPIVOT = create_gradient(CONFIG['right_pivot'], SKI_LENGTH, 1)
    LPIVOT = create_gradient(CONFIG['left_pivot'], SKI_LENGTH, 1)

    # Image
    im = Image.new("RGB", (WIDTH, HEIGHT), "white")
    draw = ImageDraw.Draw(im)

    # Starting Point
    coord = (WIDTH/2 - CONFIG['radius'] - CONFIG['traverse']/2, CONFIG['margin'])
    draw_curves(coord)

    im.save(name+".png")
