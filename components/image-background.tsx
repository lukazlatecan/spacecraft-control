"use client";
import React, { useEffect, useState } from 'react';
import styles from '../styles/BackgroundWithFloatingImages.module.css';

interface FloatingImage {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  duration: number;
}

interface BackgroundWithFloatingImagesProps {
  imageUrl: string;
}

const BackgroundWithFloatingImages: React.FC<BackgroundWithFloatingImagesProps> = ({ imageUrl }) => {
  const [images, setImages] = useState<FloatingImage[]>([]);

  useEffect(() => {
    const spawnImage = () => {
      const id = Math.random().toString(36).substring(7);

      // Randomly decide the starting corner
      const corners = [
        { startX: -20, startY: -20, endX: 120, endY: 120 }, // Top-left to bottom-right
        { startX: 120, startY: -20, endX: -20, endY: 120 }, // Top-right to bottom-left
        { startX: -20, startY: 120, endX: 120, endY: -20 }, // Bottom-left to top-right
        { startX: 120, startY: 120, endX: -20, endY: -20 }, // Bottom-right to top-left
      ];
      const selectedCorner = corners[Math.floor(Math.random() * corners.length)];

      const size = Math.random() * 20 + 30; // Random size between 50px and 100px
      const duration = Math.random() * 5 + 7; // Random duration between 7 and 12 seconds

      const newImage: FloatingImage = {
        id,
        startX: selectedCorner.startX,
        startY: selectedCorner.startY,
        endX: selectedCorner.endX,
        endY: selectedCorner.endY,
        size,
        delay: Math.random() * 2, // Random delay for animation (seconds)
        duration,
      };

      setImages((prev) => [...prev, newImage]);

      // Remove image after it completely leaves the screen
      setTimeout(() => {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }, (duration + 2) * 1000); // Duration + buffer for delay
    };

    const interval = setInterval(spawnImage, 15000); // Spawn every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.background}>
      {images.map((image) => (
        <img
          key={image.id}
          src={imageUrl}
          alt="Floating satellite"
          style={{
            top: `${image.startY}%`,
            left: `${image.startX}%`,
            width: `${image.size}px`,
            height: `${image.size}px`,
            animationDelay: `${image.delay}s`,
            animationDuration: `${image.duration}s`,
            animationName: `${styles.moveImage}`,
            '--startX': `${image.startX}%`,
            '--startY': `${image.startY}%`,
            '--endX': `${image.endX}%`,
            '--endY': `${image.endY}%`,
          } as React.CSSProperties}
          className={styles.floatingImage}
        />
      ))}
    </div>
  );
};

export default BackgroundWithFloatingImages;
