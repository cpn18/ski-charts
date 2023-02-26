import sys
import json
import math
from PIL import Image, ImageDraw, ImageOps

SIZE=400

def draw_line(coords, length, bearing, fill="black", width=1):
    angle = math.radians(bearing)
    dy = length * math.cos(angle)
    dx = length * math.sin(angle)
    end = (coords[0] + dx, coords[1] + dy)
    if width > 0:
        draw.line([coords, end], fill=fill, width=int(width))
    return end

# Pixels
CONFIG = {
    "margin": 5,
    "radius": 150,
    "angle": 80,
    "traverse": 10,
    "fallline": 0,
    "stance": 10,
    "pressure": 8,
    "gradient": [
        (0, 90, 10),
        (40, 50, 50),
        (60, 50, 50),
        (100, 10, 90),
        ],
}

def create_gradient(fixed_points, width):
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
        gradient[i] = (width * gradient[i][0] / 100.0,  width * gradient[i][1] / 100.0)
    return gradient

def draw_curves(coord):
    rcoord = (coord[0]-CONFIG['stance'], coord[1])
    lcoord = (coord[0]+CONFIG['stance'], coord[1])

    total_distance = CONFIG['fallline'] + CONFIG['traverse'] + 2*2*math.pi*CONFIG['radius']*(CONFIG['angle']/360.0)
    right_distance = 0.0
    left_distance = 0.0

    # Apex
    distance = 1
    for i in range(int(CONFIG['fallline']/2)):
        rcoord = draw_line(rcoord, distance, 0, width=GRADIENT[int(100*right_distance/total_distance)][0])
        lcoord = draw_line(lcoord, distance, 0, width=GRADIENT[int(100*left_distance/total_distance)][1])
        right_distance += distance
        left_distance += distance
    # Right Footer
    rdistance = (2*math.pi*(CONFIG['radius']+CONFIG['stance']))/360
    ldistance = (2*math.pi*(CONFIG['radius']-CONFIG['stance']))/360
    for i in range(CONFIG['angle']):
        rcoord = draw_line(rcoord, rdistance, i, width=GRADIENT[int(100*right_distance/total_distance)][0])
        lcoord = draw_line(lcoord, ldistance, i, width=GRADIENT[int(100*left_distance/total_distance)][1])
        right_distance += rdistance
        left_distance += ldistance
    # Traverse
    distance = 1 
    for i in range(CONFIG['traverse']):
        rcoord = draw_line(rcoord, distance, CONFIG['angle'], width=GRADIENT[int(100*right_distance/total_distance)][0])
        lcoord = draw_line(lcoord, distance, CONFIG['angle'], width=GRADIENT[int(100*left_distance/total_distance)][1])
        right_distance += distance
        left_distance += distance
    # Left Footer
    ldistance = (2*math.pi*(CONFIG['radius']+CONFIG['stance']))/360
    rdistance = (2*math.pi*(CONFIG['radius']-CONFIG['stance']))/360
    for i in range(CONFIG['angle']):
        rcoord = draw_line(rcoord, rdistance, CONFIG['angle']-i, width=GRADIENT[int(100*right_distance/total_distance)][0])
        lcoord = draw_line(lcoord, ldistance, CONFIG['angle']-i, width=GRADIENT[int(100*left_distance/total_distance)][1])
        right_distance += rdistance
        left_distance += ldistance
    # Apex
    distance = 1 
    for i in range(int(CONFIG['fallline']/2)):
        rcoord = draw_line(rcoord, distance, 0, width=GRADIENT[int(100*right_distance/total_distance)][0])
        lcoord = draw_line(lcoord, distance, 0, width=GRADIENT[int(100*left_distance/total_distance)][1])
        right_distance += distance
        left_distance += distance

if __name__ == "__main__":
    name = sys.argv[1]
    with open(name+".json") as infile:
        CONFIG = json.loads(infile.read())

    # Calculate the Pressure Gradient map
    GRADIENT = create_gradient(CONFIG['gradient'], CONFIG['pressure'])

    # Image
    im = Image.new("RGB", (SIZE, SIZE), "white")
    draw = ImageDraw.Draw(im)

    # Starting Point
    coord = (SIZE/2 - CONFIG['radius'] - CONFIG['traverse']/2, CONFIG['margin'])
    draw_curves(coord)

    im.save(name+".png")
