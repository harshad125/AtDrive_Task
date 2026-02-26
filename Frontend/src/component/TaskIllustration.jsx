const TaskIllustration = () => {
  return (
    <svg
      viewBox='0 0 500 500'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-auto max-w-md'
    >
      {/* Background elements */}
      <circle cx='250' cy='250' r='200' fill='hsl(var(--primary) / 0.1)' />
      <circle cx='250' cy='250' r='150' fill='hsl(var(--primary) / 0.15)' />

      {/* Clipboard */}
      <rect
        x='150'
        y='100'
        width='200'
        height='280'
        rx='16'
        fill='hsl(var(--card))'
        stroke='hsl(var(--border))'
        strokeWidth='2'
      />
      <rect
        x='190'
        y='85'
        width='120'
        height='30'
        rx='8'
        fill='hsl(var(--primary))'
      />
      <circle cx='250' cy='100' r='8' fill='hsl(var(--card))' />

      {/* Task items */}
      {/* Task 1 - Completed */}
      <rect
        x='175'
        y='140'
        width='150'
        height='50'
        rx='8'
        fill='hsl(var(--accent))'
      />
      <rect
        x='190'
        y='155'
        width='20'
        height='20'
        rx='4'
        fill='hsl(var(--primary))'
      />
      <path
        d='M195 165 L198 168 L205 160'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect
        x='220'
        y='158'
        width='80'
        height='8'
        rx='4'
        fill='hsl(var(--muted-foreground) / 0.3)'
      />
      <rect
        x='220'
        y='170'
        width='50'
        height='6'
        rx='3'
        fill='hsl(var(--muted-foreground) / 0.2)'
      />

      {/* Task 2 - Completed */}
      <rect
        x='175'
        y='200'
        width='150'
        height='50'
        rx='8'
        fill='hsl(var(--accent))'
      />
      <rect
        x='190'
        y='215'
        width='20'
        height='20'
        rx='4'
        fill='hsl(var(--primary))'
      />
      <path
        d='M195 225 L198 228 L205 220'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect
        x='220'
        y='218'
        width='90'
        height='8'
        rx='4'
        fill='hsl(var(--muted-foreground) / 0.3)'
      />
      <rect
        x='220'
        y='230'
        width='60'
        height='6'
        rx='3'
        fill='hsl(var(--muted-foreground) / 0.2)'
      />

      {/* Task 3 - Pending */}
      <rect
        x='175'
        y='260'
        width='150'
        height='50'
        rx='8'
        fill='hsl(var(--accent))'
      />
      <rect
        x='190'
        y='275'
        width='20'
        height='20'
        rx='4'
        fill='hsl(var(--border))'
        stroke='hsl(var(--muted-foreground) / 0.3)'
        strokeWidth='1.5'
      />
      <rect
        x='220'
        y='278'
        width='70'
        height='8'
        rx='4'
        fill='hsl(var(--muted-foreground) / 0.3)'
      />
      <rect
        x='220'
        y='290'
        width='45'
        height='6'
        rx='3'
        fill='hsl(var(--muted-foreground) / 0.2)'
      />

      {/* Task 4 - Pending */}
      <rect
        x='175'
        y='320'
        width='150'
        height='50'
        rx='8'
        fill='hsl(var(--accent))'
      />
      <rect
        x='190'
        y='335'
        width='20'
        height='20'
        rx='4'
        fill='hsl(var(--border))'
        stroke='hsl(var(--muted-foreground) / 0.3)'
        strokeWidth='1.5'
      />
      <rect
        x='220'
        y='338'
        width='85'
        height='8'
        rx='4'
        fill='hsl(var(--muted-foreground) / 0.3)'
      />
      <rect
        x='220'
        y='350'
        width='55'
        height='6'
        rx='3'
        fill='hsl(var(--muted-foreground) / 0.2)'
      />

      {/* Decorative elements */}
      <circle cx='380' cy='150' r='25' fill='hsl(var(--primary) / 0.2)' />
      <circle cx='120' cy='320' r='20' fill='hsl(var(--primary) / 0.15)' />
      <circle cx='400' cy='350' r='15' fill='hsl(var(--primary) / 0.25)' />

      {/* Floating checkmark */}
      <circle cx='380' cy='280' r='30' fill='hsl(var(--primary))' />
      <path
        d='M368 280 L376 288 L392 272'
        stroke='white'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Pencil */}
      <g transform='translate(90, 180) rotate(-30)'>
        <rect
          x='0'
          y='0'
          width='12'
          height='80'
          rx='2'
          fill='hsl(var(--primary))'
        />
        <polygon points='6,80 0,95 12,95' fill='hsl(var(--foreground) / 0.7)' />
        <rect
          x='0'
          y='0'
          width='12'
          height='15'
          rx='2'
          fill='hsl(var(--muted-foreground) / 0.4)'
        />
      </g>
    </svg>
  );
};

export default TaskIllustration;
